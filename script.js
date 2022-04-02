 <script src="jquery.min.js"><script>

 <script src="menu.js"><script>
$(()=>{

getData(items);
applyEvent();


})


let counter = 0;

// items.categories[0]['menu-items'][0].name
// $('div').eq(0).removeClass('container');





function getData(items){
// console.log(items);
// console.log(items.categories);
const z = $('.items').eq(0).clone();
$('.items').eq(0).remove();
for(let i=0 ;i<items.categories.length;i++){
const newItem = z.clone();

$('.itemsContainer').append(newItem)
// items.categories[0].section
console.log(items.categories[i]);

newItem.children('h2').html(items.categories[i].section);
const x = newItem.children('div').clone();
newItem.children('div').remove();
for(let j=0 ; j<items.categories[i]['menu-items'].length ; j++){
y = x.clone()

newItem.append(y)
y.children('h3').html(items.categories[i]['menu-items'][j].name);
y.children('img').attr('src',items.categories[i]['menu-items'][j].image);
y.children('p').eq(0).html(items.categories[i]['menu-items'][j].description);
y.children('p').eq(1).html("price :"+items.categories[i]['menu-items'][j].price);
}

}



}





   function applyEvent (){
  $('body').on('click','.buy', () =>{
    changeLayout(true);

let target =event.target.parentNode;
// target.children('h3').eq(0).html('');
  // let t = $('event.target');
  // if(t.is('button'))
console.log(target);
// alert (t);
  // console.log(event.target.parentNode);
  // console.log(target.children('h3'));
  // event.target.parentNode.firstChild.innerHTML="";
// console.log(x);
  // console.log(target);
  buy(target);

  });
  $('body').on('click','.plus',()=>{
   let plusTarget = event.target.parentNode;
   changeQuantity(plusTarget,"increment");


  })
  $('body').on('click','.minus',()=>{
   let minusTarget = event.target.parentNode;
   changeQuantity(minusTarget ,"decrement");
 })

 $('body').on('click','.remove',()=>{
  let removeTarget = event.target.parentNode;
  removeItem(removeTarget);
 })

 }



function changeClasses(){
  $('#wrapper').toggleClass('container-1').toggleClass('container');
  $('#total').toggleClass('hidden').toggleClass('receit');
}





function buy(target){
counter++;
let priceStatment = target.querySelector('.item-1 :nth-child(4)').innerHTML;

let price = parseInt(priceStatment.slice(7));
if(counter==1){

$('.eq').html(1+" "+ target.firstChild.nextElementSibling.innerHTML);
$('.price').html(" price : "+price);
$('div').eq(0).children('div').eq(0).css({margin:0});
}else{
  let a=$('#total').clone();
  a.children('p').eq(0).html(1+" "+ target.firstChild.nextElementSibling.innerHTML);
  a.children('p').eq(1).html(" price : "+price);
 $('.receitContainer').append(a);
}





getTotal();
}

function changeQuantity(target,funtype){

  let sentence = target.firstChild.nextElementSibling.innerHTML;
  let quantityStr = sentence.slice(0,2);
  let quantity = parseInt(quantityStr);

  let priceStatment = target.querySelector('#total :nth-child(4)').innerHTML;

  let price = parseInt(priceStatment.slice(8));

let fixedPrice = price/quantity;
  let type = sentence.slice(1);
  if(funtype =="increment"){
    quantity+=1;

    price+=fixedPrice;

  }
  else{
if(quantity==1)removeItem(target);
else{
  quantity-=1;

  price-=fixedPrice;

}

}
target.firstChild.nextElementSibling.innerHTML=quantity + " " + type;
target.querySelector('#total :nth-child(4)').innerHTML=" price : "+price;
getTotal();
}





function removeItem(target){
  if(counter==1){
    changeClasses();
  }
  else{
    target.remove();
    getTotal();
    changeLayout();
  }

  counter--;
}






function changeLayout(showbool){
  let currentClass = $('.receitContainer').children('div').eq(0).attr('class');
  if(currentClass ==='hidden' && showbool){
    changeClasses();
  }
  if(typeof currentClass === 'undefined'){

    changeClasses();
  }
}



function getTotal() {
  let itemPrice;
  let totalPrice=0;
   for(let i=0 ; i< $('.receitContainer').children('div').length ; i++){
    itemPriceStr = $('.receitContainer').children('div').eq(i).children('p').eq(1).html();
    itemPrice=parseInt(itemPriceStr.slice(9));

    totalPrice+=itemPrice;
 }
 $('.receitContainer').children('p').eq(0).html("total price : "+totalPrice);
}
