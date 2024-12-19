let elOrderList = document.querySelector('.order-table')
let orderData = JSON.parse(localStorage.getItem('order-products'))

// render products start
function renderProducts(arr,list){
    list.innerHTML = null
    arr.forEach(item => {
        let elTR = document.createElement('tr')
        elTR.innerHTML = `
        <td class="py-[20px] text-center">${item.username}</td>
        <td class="py-[20px] text-center">${item.phoneNumber}</td>
        <td class="py-[20px] text-center">
            <img class="mx-auto" src="${item.imgUrl}" alt="" width="110" height="41">
        </td>
        <td class="py-[20px] text-center">${item.price}</td>
        <td class="py-[20px] text-center">${item.address}</td>
        <td class="py-[20px] text-center">${item.orderetAt}</td>
        <td class="py-[20px] ">
            <button onclick="handleOrderDelete(${item.id})">
                <img class="ml-[30px] " src="./images/delete-icon.svg" alt="delete icon" width="22" height="22">
            </button>
        </td>
        `
        list.append(elTR)
    })
}
renderProducts(orderData, elOrderList)
// render products end


// delete order product start
function handleOrderDelete(id){
    const deleteIndex = orderData.findIndex(item => item.id == id)
    orderData.splice(deleteIndex , 1)
    renderProducts(orderData, elOrderList)
    localStorage.setItem('order-products', JSON.stringify(orderData))
}
// delete order product end