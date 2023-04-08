const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => Card.populate(card, { path: 'owner', select: '-password -__v' }))
    .then((card) => {
      res.status(201).send({ card, message: 'Карточка создана' });
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (card.owner._id.toString() !== req.user._id) {
        throw new ForbiddenError('Невозможно удалить карточку другого пользователя');
      }
      return Card.deleteOne({ _id: req.params.cardId })
        .then(() => { res.send({ data: card }); });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate('owner likes')
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.send(card);
      }
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .populate('owner likes')
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Пользователь не найден');
    } else {
      res.send(card);
    }
  })
  .catch(next);
