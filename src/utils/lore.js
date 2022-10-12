export function updateLore(cards) {
    let lore = getLore();
    lore.cards = cards;
    localStorage.setItem('lore', JSON.stringify(lore));
}

export function getLore() {
    let lore = JSON.parse(localStorage.getItem('lore'));
    if (lore == null) {
        let lores = JSON.parse(localStorage.getItem('lores'));
        if (lores == null) {
            lores = [];
        }

        lore = {
            "character": {
                "name": 'new char_' + lores.length.toString(),
                "imageUrl": "",
                "role": "define a role",
                "description": "input a description"
            },
            "cards": []
        }
        localStorage.setItem('lore', JSON.stringify(lore));
    }

    return lore;
}

export function exportJSON(obj, filename) {
    const json = JSON.stringify(obj, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);

    // create "a" HTLM element with href to file
    const link = document.createElement('a');
    link.href = href;
    link.download = filename + '.json';
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
}