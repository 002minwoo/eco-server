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
    async addBlog(req, res) {
        try {
            db.blog.create({
                ...req.body, slug: "", time_created: new Date().toString(), discount: 0, photo: req.body.image, content: req.body.content, desc: req.body.desc
            })
    
            return res.status(200).json({ ok: true })
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({ok: false})
        }
    },
    async updateBlog(req, res) {
        try {
            await db.blog.update(
                { ...req.body },
                {
                    where: {
                        id: req.body.id
                    }
                },
            )
            return res.status(200).json({ ok: true })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ ok: false })
        }
    },

    async getListTour(req, res) {
        const blogList = await db.blog.findAll({
            order: [['createdAt', 'DESC']],
        })
        return res.status(200).json({ ok: true, data: blogList })
    },
    async getListSuggestTour(req, res) {
        const blogList= await db.blog.findAll({
            limit: 4
        })
        return res.status(200).json({ success: true, data: blogList });
    },
    async getListBlogCategory(req, res) {
        try {
            const blogList= await db.blog.findAll({
                where: {
                    type: req.query.type
                }
            })
            return res.status(200).json({ok: true, data: blogList})
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({ok: false})
        }
    },
    async getTourDetail(req, res) {
        try {
            const blogList= await db.blog.findAll({
                where: {
                    id: req.query.id
                }
            })
            return res.status(200).json({ok: true, data: blogList})
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({ok: false})
        }
    }
    ,
    async deleteTour(req, res) {
        const { id } = req.body
        db.blog.destroy({
            where: {
                id: id
            }
        })
        return res.status(200).json({ ok: true })
    },


}