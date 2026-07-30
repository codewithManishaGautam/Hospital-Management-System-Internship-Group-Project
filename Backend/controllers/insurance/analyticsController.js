const InsuranceCase = require('../../models/insurance/InsuranceCase');

// GET /api/insurance/analytics
exports.getAnalyticsDashboard = async (req, res) => {
  try {
    const totalCases = await InsuranceCase.countDocuments();
    
    // Aggregation for financial totals (billed, approved, settled)
    const financials = await InsuranceCase.aggregate([
      {
        $group: {
          _id: null,
          totalBilled: { $sum: '$financials.totalBilled' },
          totalApproved: { $sum: '$financials.approvedAmount' },
          totalSettled: { $sum: '$financials.settledAmount' },
          totalCopay: { $sum: '$financials.patientPayable' }
        }
      }
    ]);

    // Aggregation for case statuses
    const statusCounts = await InsuranceCase.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Aggregation for cases by company
    const companyStatsRaw = await InsuranceCase.aggregate([
      {
        $group: {
          _id: '$insuranceCompanyId',
          count: { $sum: 1 },
          totalApproved: { $sum: '$financials.approvedAmount' }
        }
      },
      {
        $lookup: {
          from: 'insurancecompanies', // Must match the actual collection name for InsuranceCompany
          localField: '_id',
          foreignField: '_id',
          as: 'company'
        }
      },
      {
        $unwind: { path: '$company', preserveNullAndEmptyArrays: true }
      }
    ]);

    const companyStats = companyStatsRaw.map(stat => ({
      companyName: stat.company ? stat.company.companyName : 'Unknown',
      count: stat.count,
      totalApproved: stat.totalApproved
    }));

    res.status(200).json({
      success: true,
      data: {
        totalCases,
        financials: financials[0] || { totalBilled: 0, totalApproved: 0, totalSettled: 0, totalCopay: 0 },
        statusCounts,
        companyStats
      }
    });

  } catch (error) {
    console.error('Analytics Error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching analytics' });
  }
};
