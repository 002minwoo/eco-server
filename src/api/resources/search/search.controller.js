import { Op } from "sequelize"
import { db } from "../../../models"

export default {
    async searchProduct(req, res) {
        const data = req.query
        const { typeBooking, realEstateType, province, district, ward, budget, subCategoryId, minBudget, maxBudget, departurePoint, destinationPoint, type, page } = data
        if (parseInt(typeBooking) == 1) {
            let pageOffset
            if (parseInt(page) > 1) {
                pageOffset = parseInt(page)
            }
            else {
                pageOffset = 0
            }
            let whereConditions = {
                categoryId: 13
            }
            if (realEstateType) {
                whereConditions.subCategoryId = realEstateType
            }
            if (parseInt(province) > 0) {
                whereConditions.province = province
            }
            if (district) {
                whereConditions.district = district
            }
            if (ward) {
                whereConditions.ward = ward
            }
            if (budget) {
                whereConditions.budget = budget
            }
            if (subCategoryId) {
                whereConditions.subCategoryId= subCategoryId
            }
            if (minBudget && maxBudget) {
                const result = await db.product
                    .findAndCountAll({
                        where: {
                            ...whereConditions, price: {
                                [Op.between]: [minBudget, maxBudget]
                            }
                        },
                        include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
                        order: [
                            ["createdAt", "DESC"]
                        ],
                        limit: 9,
                        offset: pageOffset
                    })
                return res.status(200).json({ data: result?.rows, count: result?.count, success: true })
            }
            else {
                const result = await db.product
                    .findAndCountAll({
                        where: whereConditions,
                        include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
                        order: [
                            ["createdAt", "DESC"]
                        ],
                        limit: 9,
                        offset: pageOffset
                    })
                const count = await db.product
                    .count({
                        where: whereConditions,
                    })
                return res.status(200).json({ data: result?.rows, count: count, success: true })
            }

        }
        // 
        if (parseInt(typeBooking) == 2) {
            let whereConditions = {
                categoryId: 12
            }
            if (realEstateType) {
                whereConditions.subCategoryId = realEstateType
            }
            if (province) {
                // whereConditions.province= province
            }
            if (district) {
                whereConditions.district = district.toString()
            }
            if (ward) {
                whereConditions.ward = ward.toString()
            }
            if (budget) {
                whereConditions.budget = budget
            }
            if (subCategoryId) {
                whereConditions.subCategoryId = parseInt(subCategoryId)
            }

            if (minBudget && maxBudget) {
                const result = await db.product
                    .findAndCountAll({
                        where: {
                            ...whereConditions, price: {
                                [Op.between]: [minBudget, maxBudget]
                            }
                        },
                        order: [
                            ["createdAt", "DESC"]
                        ],
                        include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
                    })
                return res.status(200).json({ data: result?.rows, count: result?.rows?.length, success: true })
            }
            else {
                const result = await db.product
                    .findAndCountAll({
                        where: whereConditions,
                        include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
                        order: [
                            ["createdAt", "DESC"]
                        ]
                    })
                return res.status(200).json({ data: result?.rows, count: result?.rows?.length, success: true })
            }
        }
        if (parseInt(typeBooking) === 3) {
            let whereConditions = {

            }
            if (departurePoint) {
                whereConditions.departure = departurePoint
            }
            if (destinationPoint) {
                whereConditions.destination = destinationPoint
            }
            if (type) {
                whereConditions.type = parseInt(type)
            }
            if (minBudget && maxBudget) {
                const result = await db.tour
                    .findAndCountAll({
                        where: {
                            ...whereConditions, price: {
                                [Op.between]: [minBudget, maxBudget]
                            }
                        },
                        order: [
                            ["createdAt", "DESC"]
                        ],
                    })
                return res.status(200).json({ data: result?.rows, count: result?.rows?.length, success: true })
            }
            else {
                const result = await db.tour
                    .findAndCountAll({
                        where: whereConditions,
                        order: [
                            ["createdAt", "DESC"]
                        ]
                    })
                return res.status(200).json({ data: result?.rows, count: result?.rows?.length, success: true })
            }

        }
        if (parseInt(typeBooking) === 4) {

        }
        else {
            return res.status(200).json([])
        }
    }
}
