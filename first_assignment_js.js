const upper_boxes = document.getElementsByClassName('upper')
const lower_boxes = document.getElementsByClassName('lower')
const upper = document.getElementById('upper')
const lower = document.getElementById('lower')
// const great = '좋아요!'
// const good = '괜찮네요!'
// const soso = '흠..'
// const bad = '그러지 마세요...'
// let message = ''
// const evaluate = [[good,great,great,good,bad,great],
//                   [great,soso,bad,great,good,great],
//                   [good,good,soso,soso,great,great],
//                   [bad,bad,good,soso,great,good],
//                   [soso,good,great,good,bad,great]]
upper_boxes[0].onclick = function(event){
    upper.style.background = event.target.style.background
    // message = evaluate[]
    alert(event.target.index)
}
lower_boxes[0].onclick = function(event){
    lower.style.background = event.target.style.background
}
