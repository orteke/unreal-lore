export function updateLore(cards, character) {
    let lore = getLore();
    let lores = getLores();

    lore.cards = cards;
    lore.character = character;
    lores[lore.character.name] = lore;

    localStorage.setItem('lore', JSON.stringify(lore));
    localStorage.setItem('lores', JSON.stringify(lores));
}

export function getLore() {
    let lore = JSON.parse(localStorage.getItem('lore'));
    if (lore == null) {
        lore = emptyLore(0);
        appendLore(lore);
    }

    return lore;
}

export function getLores() {
    let lores = JSON.parse(localStorage.getItem('lores'));
    if (lores == null) {
        lores = {};
    }

    return lores;
}

export function removeLore(loreName) {
    let lores = getLores();

    if (lores.hasOwnProperty(loreName)) {
        delete lores[loreName];
        localStorage.setItem('lores', JSON.stringify(lores));
    }
}

export function appendLore(lore) {
    let lores = getLores();

    lores[lore.character.name] = lore;
    localStorage.setItem('lores', JSON.stringify(lores));
    localStorage.setItem('lore', JSON.stringify(lore));


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

export function emptyLore(index) {
    return {
        "character": {
            "name": 'new char_' + index.toString(),
            "imageUrl": "",
            "role": "define a role",
            "description": "input a description"
        },
        "cards": [
            {
                "id": "c1",
                "token": "va5QGUXgWwy-RS1FIkJCk",
                "hint": "Hello",
                "position": {
                    "x": 40,
                    "y": 30
                },
                "ops": [
                    {
                        "id": "c1o1",
                        "token": "cSPtozdb5KOPhXfHZDz9A",
                        "text": "Hi",
                        "next": "c2"
                    },
                    {
                        "id": "c1o2",
                        "token": "kUS_QP6w-TK-NVshS4NM3",
                        "text": "Where is the princess?",
                        "next": "c3"
                    }
                ]
            },
            {
                "id": "c2",
                "token": "IT67OZKiszqmbr40XDMmm",
                "hint": "Do you want learn where is the princess?",
                "position": {
                    "x": 560,
                    "y": 88
                },
                "ops": [
                    {
                        "id": "c2o1",
                        "token": "aDf8kvF5EgEv66l67h09Q",
                        "text": "Yes",
                        "next": "c3"
                    },
                    {
                        "id": "c2o2",
                        "token": "i-v9s5YUV9t3HgMtF8Rpd",
                        "text": "No",
                        "next": "0"
                    }
                ]
            },
            {
                "id": "c3",
                "token": "kNbZv7tBkOTyiUO4Y1czB",
                "hint": "Princess is another...",
                "position": {
                    "x": 84,
                    "y": 94
                },
                "ops": [
                    {
                        "id": "c3o1",
                        "token": "-JxDsbZDXxTa4u6BKviva",
                        "text": "f***",
                        "next": "0"
                    },
                    {
                        "id": "c3o2",
                        "token": "bkKclA0lgMFnSDuiZAj8e",
                        "text": "Give me an address",
                        "next": "0"
                    }
                ]
            }
        ]
    }
}