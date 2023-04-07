const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  modifyUser,
  modifyUserAvatar,
  getUserById,
} = require('../controllers/users');
const { regexLink } = require('../utils/constants');

router.get('/', getUsers);

router.get('/:userId', celebrate({
  params: Joi.object().keys({ userId: Joi.string().hex().length(24).required() }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), modifyUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(regexLink),
  }),
}), modifyUserAvatar);

module.exports = router;
