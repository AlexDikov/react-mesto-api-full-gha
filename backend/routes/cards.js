const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({ cardId: Joi.string().hex().length(24) }),
}), deleteCard);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    link: Joi.string().required().regex(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/),
  }),
}), createCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({ cardId: Joi.string().hex().length(24) }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({ cardId: Joi.string().hex().length(24) }),
}), dislikeCard);

module.exports = router;
