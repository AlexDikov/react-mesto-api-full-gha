const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { regexLink } = require('../utils/constants');

router.get('/', getCards);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({ cardId: Joi.string().hex().length(24).required() }),
}), deleteCard);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regexLink),
  }),
}), createCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({ cardId: Joi.string().hex().length(24).required() }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({ cardId: Joi.string().hex().length(24).required() }),
}), dislikeCard);

module.exports = router;
