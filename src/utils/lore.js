export function updateLore(cards, character) {
    let lore = getLore();
    lore.cards = cards;
    lore.character = character;
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

export function exportUEDatatable(obj, filename) {
    let datatable = [];
    for (let i = 0; i < obj.cards.length; i++) {
        let d = {
            Name: i + 1,
            hint: obj.cards[i].hint,
            ops: []
        };

        for (let j = 0; j < obj.cards[i].ops.length; j++) {
            let next = obj.cards[i].ops[j].next;
            console.log('asdasdasdasasd', next);
            if (next.substring(0, 1) == 'c') {
                next = next.substring(1);
            }

            d.ops.push({
                text: obj.cards[i].ops[j].text,
                next: parseInt(next),
            })
        }

        datatable.push(d);
    }

    return exportJSON(datatable, filename)
}

export function getBase64(file) {
    return new Promise((resolve, reject) => {
        if (file.type.split('/')[0] !== 'image') {
            alert("you can only use image files!");

            return
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export function isFileImage(file) {
    return file && file['type'].split('/')[0] === 'image';
}