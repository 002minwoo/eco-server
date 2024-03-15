import { db } from "../../../models"


function generateCode() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    let code = '';

    for (let i = 0; i < 3; i++) {
        code += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    code += '-';

    for (let i = 0; i < 5; i++) {
        if (i === 2) {
            code += '-';
        } else {
            code += letters.charAt(Math.floor(Math.random() * letters.length));
        }
    }

    code += '-';

    for (let i = 0; i < 5; i++) {
        if (i === 3) {
            code += '-';
        } else {
            code += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
    }

    code += '-';

    for (let i = 0; i < 4; i++) {
        code += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    return code;
}


export default {
    async addTour(req, res) {
        try {
            await db.tour.create({
                ...req.body, slug: "", time_created: new Date().toString(), discount: 0, photo: req.body.image, tour_id: generateCode(), content: req.body.content, desc: req.body.desc
            })

            return res.status(200).json({ ok: true })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ ok: false })
        }
    },
    async updateTour(req, res) {
        try {
            await db.tour.update(
                { ...req.body },
                {
                    where: {
                        tour_id: req.body.tour_id
                    }
                },
            )
            return res.status(200).json({ ok: true })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ ok: false })
        }
    }
    ,

    async getListTour(req, res) {
        const tourList = await db.tour.findAll({
            order: [['createdAt', 'DESC']],
        })
        return res.status(200).json({ ok: true, data: tourList })
    },
    async getListSuggestTour(req, res) {
        const tourList = await db.tour.findAll({
            limit: 4,
            order: [
                ["createdAt", "DESC"]
            ]
        })
        return res.status(200).json({ success: true, data: tourList });
    },
    async getListTourCategory(req, res) {
        try {
            const tourList = await db.tour.findAll({
                where: {
                    type: req.query.type
                },
                order: [
                    ["createdAt", "DESC"]
                ]
            })
            return res.status(200).json({ ok: true, data: tourList })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ ok: false })
        }
    },
    async getTourDetail(req, res) {
        try {
            const tourList = await db.tour.findAll({
                where: {
                    tour_id: req.query.id
                }
            })
            return res.status(200).json({ ok: true, data: tourList })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ ok: false })
        }
    }
    ,
    async deleteTour(req, res) {
        const { tour_id } = req.body
        db.tour.destroy({
            where: {
                tour_id: tour_id
            }
        })
        return res.status(200).json({ ok: true })
    },


}