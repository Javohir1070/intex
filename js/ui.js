let elProductList = document.querySelector('.products')
let elinflatableList = document.querySelector('.inflatable-products')
let productData = JSON.parse(localStorage.getItem('products'))

let elModalWrapper = document.querySelector('.modal-wrapper')
let elModalInner = document.querySelector('.modal-inner')

let orderList = JSON.parse(localStorage.getItem('order-products')) || []

function renderProduct(arr,list,id){
    list.innerHTML = null
    arr.filter(item => item.categoryId == id).forEach(item => {
        let elItem = document.createElement('li') 
        elItem.className = `w-[340px] relative bg-slate-200 shadow rounded-tr-[30px] rounded-b-[30px] pt-[31px] pb-[20px] px-[20px]`
        elItem.innerHTML = `
        <img class="mb-[17px]" src="${item.imgUrl}" alt="pool img" width="275" height="172">  
        <div class="flex items-center justify-between">
            <div class="flex flex-col">
                <span class="before:w-[85px] before:rotate-[5deg] before:top-[5px] before: rounded-full before:h-[2px] before:absolute before:bg-[#FF0000]  relative text-[12px] text-slate-400 leading-[13.44px]">${item.oldPrise} сум</span>
                <strong class="text-[15px] text-black leading-[13.44px]">${item.discountPrise} сум</strong>
            </div>
            <button onclick="handleOrderBtnClick(${item.id})" class="w-[107px] bg-[#FFE600] text-[16px] font-bold py-[3px] rounded-tr-[20px] rounded-bl-[20px]">Заказать</button>
        </div>
        <button class="absolute top-0 left-0  font-bold text-[15px] py-[3px] ${item.status == 0 && "bg-[#139D4B]"}  ${item.status == 1 && "bg-[#FFD600]"} ${item.status == 2 && "bg-[#ED2020]"} rounded-br-[20px] text-white w-[140px]">
            ${item.status == 0 ?   "Рекомендуем" : ''}
            ${item.status == 1 ?   "Cкидка" : ''}
            ${item.status == 2 ?   "Нет  в наличии" : ''}
        </button>
        `
        list.append(elItem)
    })
}
renderProduct(productData, elProductList, '0')
renderProduct(productData, elinflatableList, '1')

let date = new Date()
const time = `${String(date).split(' ')[4].split(':').splice(0, 2).join(':')} ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear() % 100}`

// order part start
function handleOrderBtnClick(id){
    const findProduct = productData.find(item => item.id == id)
    elModalWrapper.classList.remove('scale-0')
    elModalInner.innerHTML = `
    <img class="ml-[900px]" src="./images/x-icon.svg" alt="icon" width="30" height="30">   
    <div class="flex items-center">
        <div class="w-[55%] py-[40px] rounded-[35px] bg-white shadow-lg">
            <img src=${findProduct.imgUrl} alt="pool img" width="489" height="305">
            <strong class="block text-[20px] mt-[31px] text-center">${findProduct.discountPrise}сум</strong>
        </div>
        <div class="w-[30%] ml-[47px]">
            <form class="order-form flex flex-col gap-[17px]" autocomplete="off">
                <input required name="username" class="outline-none pl-5  py-[15px] shadow shadow-[#CBCBCB] border-[1px] border-[#CBCBCB] rounded-[17px] w-[359px] text-[#A3A3A3] placeholder:font-bold placeholder:text-[25px] font-bold  text-[25px] " type="text" placeholder="Ваше имя">
                <input required name="number" class="outline-none pl-5  py-[15px] shadow shadow-[#CBCBCB] border-[1px] border-[#CBCBCB] rounded-[17px] w-[359px] text-[#A3A3A3] placeholder:font-bold placeholder:text-[25px] font-bold  text-[25px] " type="number" placeholder="Ваш номер">
                <input required name="address" class="outline-none pl-5  py-[15px] shadow shadow-[#CBCBCB] border-[1px] border-[#CBCBCB] rounded-[17px] w-[359px] text-[#A3A3A3] placeholder:font-bold placeholder:text-[25px] font-bold  text-[25px] " type="text" placeholder="Ваш адрес">
                <button type="submit" class="order-btn py-[10px] text-white  w-[237px] block mx-auto  bg-[#3F8C8E]  font-bold text-[20px] text-center rounded-[10px]">Заказать</button>
            </form>
        </div>
    </div>
    `

    let elOrderForm = document.querySelector('.order-form')
    elOrderForm.addEventListener('submit', function(e){
        e.preventDefault()
        const orderData = {
            username:e.target.username.value,
            phoneNumber:e.target.number.value,
            imgUrl:findProduct.imgUrl,
            price:findProduct.discountPrise,
            address:e.target.address.value,
            orderetAt:time,
            isConfirmed:false
        }

        let elOrderBtn = document.querySelector('.order-btn')
        elOrderBtn.innerHTML = ` <img class="scale-[1.5] mx-auto" src="./images/loading.png" alt="loading" width="38" height="37">`

        setTimeout(() => {
            elOrderBtn.innerHTML = `Заказать`
            orderList.push(orderData)
            localStorage.setItem('order-products', JSON.stringify(orderList))

            elModalInner.innerHTML = `
            <img class="ml-[900px]" src="./images/x-icon.svg" alt="icon" width="30" height="30"> 
            <div class="text-center">
                <img class="mx-auto mb-[43px]" src="./images/order-check.png" alt="order img" width="232" height="232">
                <h2 class="text-[60px] font-bold mb-[39px]">Спасибо!</h2>
                <p class="text-[25px] ">Ваш заказ успешно оформлен. Мь свяжемся с вами в ближайшее время.</p>
            </div>
            `
             setTimeout(() => {
                elModalWrapper.classList.add('scale-0')
             },2000)
        },1000)
    })
}
// order part end

elModalWrapper.addEventListener('click', (e) => e.target.id == 'wrapper' && elModalWrapper.classList.add('scale-0'))

