const Router = require('express')
const User = require('../models/User')
const router = new Router()
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const authMiddleware = require('../middleware/auth.middleware')


router.post('/registration',
  [
    check('first_name', 'Неправильное имя').notEmpty(),
    check('last_name', 'Неправильная фамилия').notEmpty(),
    check('email', 'Неправильный email').isEmail(),
    check('password', 'Неправильный пароль').isLength({min: 3, max: 25}),
    check('phone', 'Неправильный телефон').isLength({min: 11, max: 11})
  ],
  async (req, res) => {
  try {
    console.log(req.body)
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return res.status(400).json({message: "Некорректный запрос", errors})
    }

    const {first_name, last_name, email, password, phone} = req.body

    const candidate = await User.findOne({ email })

    if (candidate) {
      return res.status(400).json({message:"Пользователь с таким email уже существует"})
    }

    const hashPassword = await bcrypt.hash(password, 5)

    const user = new User({first_name: first_name, last_name: last_name, email: email, password: hashPassword, phone: phone})
    await user.save()
    return res.json({message:'Пользователь создан'})

  } catch (e) {
    console.log(e)
    res.send({message:'Server error'})
  }
})


router.post('/login', async (req, res) => {
    try {
      const {email, password} = req.body
      const user = await User.findOne({email: email})
      if (!user) return res.status(404).json({message: "Пользователь не найден"})
      const isPassValidate = bcrypt.compareSync(password, user.password)
      if (!isPassValidate) return res.status(400).json({message: "Неверный пароль"})
      const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: '1h'})
      return res.json({
        token,
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone: user.phone

        }
      })
    } catch (e) {
      console.log(e)
      res.send({message:'Server error'})
    }
  })


router.get('/auth', authMiddleware,async (req, res) => {
  try {
    const user = await User.findOne({_id: req.user.id})
    const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: '1h'})
    return res.json({
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone

      }
    })
  } catch (e) {
    console.log(e)
    res.send({message:'Server error'})
  }
})

module.exports = router