import { nanoid } from 'nanoid'

export function cardIndexFromId(id) {
    if (id == '0') {
        return 0
    }

    return parseInt(id.split('o')[0].split('c')[1]) - 1
}

export function cardIdFromOptionId(id) {
    return id.split('o')[0]
}

export function cardsRefreshed(cards) {
    for (let i = 0; i < cards.length; i++) {
        cards[i].token = nanoid();
    }

    return cards
}

export function addedEmptyCardArray(cards) {
    cards.push({
        id: 'c' + (cards.length + 1).toString(),
        token: nanoid(),
        hint: 'input text',
        position: { x: 0, y: 0 },
        ops: []
    })

    return cards
}

export function removedCardByIdArray(cards, cardId) {
    cards.splice(cardIndexFromId(cardId), 1);

    return reorderedCardsArray(cards, cardId)
}

export function reorderedCardsArray(cards, removedCardId) {
    let removedCardIndex = cardIndexFromId(removedCardId)
    for (let i = 0; i < cards.length; i++) {
        cards[i].id = 'c' + (i + 1).toString();
        cards[i].token = nanoid();
        for (let j = 0; j < cards[i].ops.length; j++) {
            cards[i].ops[j].id = cards[i].id + 'o' + (j + 1).toString()
            let nextCardIndex = cardIndexFromId(cards[i].ops[j].next);
            if (cards[i].ops[j].next == removedCardId) {
                cards[i].ops[j].next = '0';
            } else if (nextCardIndex >= removedCardIndex) {
                if (cards[i].ops[j].next == '0' || cards[i].ops[j].next == 'c1') {
                    continue
                }

                cards[i].ops[j].next = 'c' + cardIndexFromId(cards[i].ops[j].next).toString();
            }
        }
    }

    return cards
}