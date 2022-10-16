const date = require('date-and-time')
const userViewModel = require('../../models/userViewModel')
const userViewController = async (req, res) => {
    const { userVisite } = req.cookies

    try {
        const time = date.format(new Date(), 'YYYY/MM/DD').split('/')
        const year = time[0]
        const month = time[1]

        const checkYear = await userViewModel.findOne({ year })
        if (checkYear) {
            const uniqeViewer = checkYear.uniqeViewer;
            const checkCookie = uniqeViewer.find(c => c === userVisite)
            if (checkCookie && checkCookie !== undefined) {
                let monthArray = checkYear.monthArray
                const checkViewer = monthArray[month - 1].uniqeViewer.find(c => c === userVisite)
                if (!checkViewer) {
                    monthArray[month - 1].viewer = monthArray[month - 1].viewer + 1
                    monthArray[month - 1].uniqeViewer = [...monthArray[month - 1].uniqeViewer, userVisite]
                    await userViewModel.updateOne({
                        year
                    }, {
                        monthArray
                    })
                    res.status(200).json({message:"success"})
                }
            }
        } else {

        }
    } catch (error) {

    }
}

module.exports = userViewController