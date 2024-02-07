const moneyEarn = require("../../models/user/EarnMoney")


exports.earnMoneyByReferal = async (req, res) => {
    const { userId, money } = req.body
    try {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);

        const updateData = new moneyEarn({
            userId: userId,
            moneyReferal: money,
            expiryDate:expiryDate,
            referalDate: new Date()
            
        })
        const savedData = await updateData.save()
        res.json(savedData)

    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Failed to add the brand', details: err.message });
    }
}


exports.getReferalDetails=async(req,res)=>{
  
        const { userId} = req.params
        try {
            const getReferalDat=await moneyEarn.find({userId:userId}) 
            res.json(getReferalDat)
        } catch (err) {
            console.error(err);
            res.status(400).json({ error: 'Failed to add the brand', details: err.message });
        }
}