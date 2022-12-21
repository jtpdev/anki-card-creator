import { parse } from 'node-html-parser';

const mapPair = (pair) => {
    if (pair.length == 2) {
        return {
            from: pair[0],
            to: pair[1]
        }
    } else {
        return {
            text: pair[0]
        }
    }


}

const split2 = (arr) => {
    let newArr = []
    for (let i = 0; i < arr.length; i = i + 2) {
        newArr.push(mapPair(arr.slice(i, i + 2)))
    }
    return newArr
}

export default (html) => {

    const root = parse(html);

    const word = root.querySelector('h3.headerWord').text

    const wrapper = root.querySelector('div.pwrapper')

    const phonetic = wrapper ? wrapper
        .childNodes.map(p =>
            p.childNodes.filter(c => c.text.trim().length > 0 && c.tagName != 'SPAN')
                .map(c => c.text)
                .join()
        ).join(' ') : '¯\\_(ツ)_/¯ => Try <a target="blank" href="https://tophonetics.com/">https://tophonetics.com/</a>';

    const translationsEven = root.querySelectorAll('tr.even:not(.more)')
        .map(tr => tr.childNodes.filter(c => c.text.trim().length > 0 && !c.classList?.contains('FrEx') && !c.classList?.contains('ToEx'))
            .map(c => c.text.trim()).join())
        .filter(text => text.length > 0)

    const translationsOdd = root.querySelectorAll('tr.odd:not(.more)')
        .map(tr => tr.childNodes.filter(c => c.text.trim().length > 0 && !c.classList?.contains('FrEx') && !c.classList?.contains('ToEx'))
            .map(c => c.text.trim()).join())
        .filter(text => text.length > 0)

    const samplesEven = split2(root.querySelectorAll('tr.even:not(.more)')
        .map(tr => tr.childNodes
            .filter(c => c.text.trim().length > 0 && c.classList?.contains('FrEx') || c.classList?.contains('ToEx'))
            .map(c => c.text.trim()).join())
        .filter(text => text.length > 0))

    const samplesOdd = split2(root.querySelectorAll('tr.odd:not(.more)')
        .map(tr => tr.childNodes
            .filter(c => c.text.trim().length > 0 && c.classList?.contains('FrEx') || c.classList?.contains('ToEx'))
            .map(c => c.text.trim()).join())
        .filter(text => text.length > 0))

    return {
        word,
        phonetic,
        translations: [...translationsEven, ...translationsOdd],
        samples: [...samplesEven, ...samplesOdd]

    }

}