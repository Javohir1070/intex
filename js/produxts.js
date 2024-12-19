let elUsername = document.querySelector('.username')
const user = JSON.parse(localStorage.getItem('user'))
elUsername.textContent = user.username

let elProductTable = document.querySelector('.product-table')
let elModalWrapper = document.querySelector('.modal-wrapper')
let elModalInner = document.querySelector('.modal-inner')
let products = JSON.parse(localStorage.getItem('products')) || []


// modal close
elModalWrapper.addEventListener('click', (e) => e.target.id == 'wrapper' && elModalWrapper.classList.add('scale-0'))
// modal close


// category part start
let elCategory1 = document.querySelector('.category-1')
let elCategory2 = document.querySelector('.category-2')

elCategory1.addEventListener('click', ()  => {
    elCategory1.className = "category-1 text-[35px] text-[#009398] leading-[40.64px] pb-[8px] font-bold border-b-[3px] cursor-pointer border-[#009398]"
    elCategory2.className = "category-2 text-[35px] text-[#A6A6A6] leading-[40.64px] pb-[8px] font-bold border-b-[3px] cursor-pointer border-[#A6A6A6] border-transparent"
    renderProducts(products, elProductTable, '0')
})

elCategory2.addEventListener('click', ()  => {
    elCategory1.className = "category-1 text-[35px] text-[#A6A6A6] leading-[40.64px] pb-[8px] font-bold border-b-[3px] cursor-pointer border-[#A6A6A6] border-transparent"
    elCategory2.className = "category-2 text-[35px] text-[#009398] leading-[40.64px] pb-[8px] font-bold border-b-[3px] cursor-pointer border-[#009398]"
    renderProducts(products, elProductTable, '1')

})  
// category part end

// add part start

const handleAddBtnClick = () => {
    elModalWrapper.classList.remove('scale-0')
    elModalInner.innerHTML = `
    <form class="add-form w-[915px] mx-auto">
    <label class="inline-block w-full mb-[33px]">
      <input class="add-choose-img hidden " type="file">
      <img class="add-img mx-auto" src="./images/empty-img.png" alt="choose img" width="691" height="316">
    </label>
    <div class="flex justify-between">
        <div class="w-[49%] flex flex-col space-y-[20px]">
          <label>
            <span class="text-[23px] text-[#898989] pl-2 mb-1 ">Категории</span>
            <select name="category_Id" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200">
              <option value="0">Каркасные</option>
              <option value="1">Надувные</option>
            </select>
          </label>
          <label>
            <span class="text-[23px] text-[#898989] pl-2 mb-1 ">Стартая цена (сум) </span>
            <input name="old_Prise" class="w-full outline-none py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Стартая цена">
          </label>
          <label>
            <span class="text-[23px] text-[#898989] pl-2 mb-1 ">Рамка</span>
            <input name="frame" class="w-full outline-none py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Рамка">
          </label>
          <label>
            <span class="text-[23px] text-[#898989] pl-2 mb-1 ">Размер (м)</span>
            <input name="size" class="w-full outline-none py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Размер (м)">
          </label>
        </div>
        <div class="w-[49%] flex flex-col space-y-[20px]">
          <label>
            <span class="text-[23px] text-[#898989] pl-2 mb-1 ">Количество</span>
            <input name="amount" class="w-full outline-none py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Количество">
          </label>
          <label>
            <span class="text-[23px] text-[#898989] pl-2 mb-1 ">Цена со скидкой (сум) </span>
            <input name="discount_prise" class="w-full outline-none py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Цена со скидкой (сум) ">
          </label>
          <label>
            <span class="text-[23px] text-[#898989] pl-2 mb-1 ">Глубина(см) </span>
            <input name="depth" class="w-full outline-none py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Глубина(см) ">
          </label>
          <label>
            <span class="text-[23px] text-[#898989] pl-2 mb-1 ">Статус</span>
            <select name="status" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200">
              <option value="0">Рекомендуем</option>
              <option value="1">Cкидка</option>
              <option value="2">Нет в наличии</option>
            </select>
          </label>
        </div>
    </div>
    <button type="submit" class="add-btn-submit py-[10px]  w-[237px] block mx-auto mt-[33px] bg-[#3F8C8E] text-white font-bold text-[20px] text-center rounded-[35px]">Добавить</button>
  </form>
    `

    let elChooseInput = document.querySelector('.add-choose-img')
    let elAddImg = document.querySelector('.add-img')
    elChooseInput.addEventListener('change', function(e){
      elAddImg.src = (URL.createObjectURL(e.target.files[0]));
    })

    let elAddForm = document.querySelector('.add-form')
    let elBtnsubmit = document.querySelector('.add-btn-submit')
    elAddForm.addEventListener('submit', function(e){
        e.preventDefault()
        const data = {
            id:products.length ? products[products.length - 1].id + 1 : 1,
            categoryId:e.target.category_Id.value,
            imgUrl:elAddImg.src,
            oldPrise:e.target.old_Prise.value,
            discountPrise:e.target.discount_prise.value,
            amount:e.target.amount.value,
            frame:e.target.frame.value,
            size:e.target.size.value,
            depth:e.target.depth.value,
            status:e.target.status.value
        }

        elBtnsubmit.innerHTML = ` <img class="scale-[1.5] mx-auto" src="./images/loading.png" alt="loading" width="38" height="37">`

        setTimeout(() => {
          elBtnsubmit.innerHTML = `Добавить`
        products.push(data)
        localStorage.setItem('products', JSON.stringify(products))
        renderProducts(products, elProductTable, data.categoryId)
        elModalWrapper.classList.add('scale-0')

        if(data.categoryId == '0'){
          elCategory1.className = "category-1 text-[35px] text-[#009398] leading-[40.64px] pb-[8px] font-bold border-b-[3px] cursor-pointer border-[#009398]"
          elCategory2.className = "category-2 text-[35px] text-[#A6A6A6] leading-[40.64px] pb-[8px] font-bold border-b-[3px] cursor-pointer border-[#A6A6A6] border-transparent"
        }
        else{
          elCategory1.className = "category-1 text-[35px] text-[#A6A6A6] leading-[40.64px] pb-[8px] font-bold border-b-[3px] cursor-pointer border-[#A6A6A6] border-transparent"
          elCategory2.className = "category-2 text-[35px] text-[#009398] leading-[40.64px] pb-[8px] font-bold border-b-[3px] cursor-pointer border-[#009398]"
        }
        },1000)

    })
}
// add part end


// Render products
function renderProducts(arr, list, categoryId){
  list.innerHTML = null
  arr.filter(item => item.categoryId == categoryId).forEach(item => {
    let elTR = document.createElement('tr')
    elTR.innerHTML = `
    <tr>
        <td class="py-[20px] text-center">
      <img class="mx-auto" src="${item.imgUrl}" alt="img" width="97" height="55">
    </td>
    <td class="py-[20px] flex flex-col">
      <span class="before:w-[85px] before:rotate-[5deg] before:top-[5px] before: rounded-full before:h-[2px] before:absolute before:bg-[#FF0000]  relative text-[12px] text-slate-400 leading-[13.44px]">${item.oldPrise}сум</span>
      <strong class="text-[15px] text-black leading-[13.44px]">1${item.discountPrise}сум</strong>
    </td>
    <td class="py-[20px] text-[20px]">${item.amount}</td>
    <td class="py-[20px] text-[20px]">${item.frame}</td>
    <td class="py-[20px] text-[20px]">${item.size}</td>
    <td class="py-[20px] text-[20px]">${item.depth}</td>
    <td class="py-[20px] text-[20px]">${item.categoryId == '0' ? 'Каркасные' : 'Надувные'}</td>
    <td class="py-[20px]">
      <div  class="flex items-center gap-[18px]">
        <button onclick="handleEditClickBtn(${item.id})">
          <img src="./images/edit-icon.svg" alt="edit icon" width="22" height="22">
        </button>
        <button onclick="handleDeleteProduct(${item.id})">
          <img src="./images/delete-icon.svg" alt="delete icon" width="22" height="22">
        </button>
      </div>
    </td>
    `
    list.append(elTR)
  })
}
renderProducts(products, elProductTable, '0')
// Renderend

// delete part start
function handleDeleteProduct(id){
  const deleteProduct = products.find(item => item.id == id)
  const deleteIndex = products.findIndex(item => item.id == id)
  products.splice(deleteIndex, 1)
  renderProducts(products, elProductTable, deleteProduct.categoryId)
  localStorage.setItem('products', JSON.stringify(products))
}
// delete part end

// edit part start
function handleEditClickBtn(id){
  elModalWrapper.classList.remove('scale-0')
  let editProduct = products.find(item => item.id == id)
  console.log(editProduct);
  elModalInner.innerHTML = `
  <form class="edit-form add-form w-[915px] mx-auto">
  <label class="inline-block w-full mb-[33px]">
    <input class="edit-choose-img hidden " type="file">
    <img class="error-img add-img mx-auto edit-img" src="${editProduct.imgUrl} " alt="choose img" width="691" height="316">
  </label>
  <div class="flex justify-between">
      <div class="w-[49%] flex flex-col space-y-[20px]">
        <label>
          <span class="text-[23px] text-[#898989] pl-2 mb-1 ">Категории</span>
          <select name="category_Id" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200">
            <option ${editProduct.categoryId == '0' && 'selected'} value="0">Каркасные</option>
            <option ${editProduct.categoryId == '1' && 'selected'} value="1">Надувные</option>
          </select>
        </label>
        <label>
          <span class="text-[23px] text-[#898989] pl-2 mb-1 ">Стартая цена (сум) </span>
          <input value=${editProduct.oldPrise}  name="old_Prise" class="w-full outline-none py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Стартая цена">
        </label>
        <label>
          <span class="text-[23px] text-[#898989] pl-2 mb-1 ">Рамка</span>
          <input value=${editProduct.frame} name="frame" class="w-full outline-none py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Рамка">
        </label>
        <label>
          <span class="text-[23px] text-[#898989] pl-2 mb-1 ">Размер (м)</span>
          <input value=${editProduct.size} name="size" class="w-full outline-none py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Размер (м)">
        </label>
      </div>
      <div class="w-[49%] flex flex-col space-y-[20px]">
        <label>
          <span class="text-[23px] text-[#898989] pl-2 mb-1 ">Количество</span>
          <input value=${editProduct.amount} name="amount" class="w-full outline-none py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Количество">
        </label>
        <label>
          <span class="text-[23px] text-[#898989] pl-2 mb-1 ">Цена со скидкой (сум) </span>
          <input value=${editProduct.discountPrise} name="discount_prise" class="w-full outline-none py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Цена со скидкой (сум) ">
        </label>
        <label>
          <span class="text-[23px] text-[#898989] pl-2 mb-1 ">Глубина(см) </span>
          <input value=${editProduct.depth} name="depth" class="w-full outline-none py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Глубина(см) ">
        </label>
        <label>
          <span class="text-[23px] text-[#898989] pl-2 mb-1 ">Статус</span>
          <select name="status" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200">
            <option ${editProduct.status == '0' && 'selected'} value="0">Рекомендуем</option>
            <option ${editProduct.status == '1' && 'selected'} value="1">Cкидка</option>
            <option ${editProduct.status == '2' && 'selected'} value="2">Нет в наличии</option>
          </select>
        </label>
      </div>
  </div>
  <button type="submit" class="edit-btn-submit py-[10px]  w-[237px] block mx-auto mt-[33px] bg-[#3F8C8E] text-white font-bold text-[20px] text-center rounded-[35px]">Изменить</button>
</form>
  ` 
  let elChooseInput = document.querySelector('.edit-choose-img')
  let elEditImg = document.querySelector('.edit-img')
  elChooseInput.addEventListener('change', function(e){
    elEditImg.src = (URL.createObjectURL(e.target.files[0]));
  })
 
  let elEditForm = document.querySelector('.edit-form ')
  elEditForm.addEventListener('submit', function(e){
    e.preventDefault()
    editProduct.imgUrl = elEditImg.src
    editProduct.categoryId = e.target.category_Id.value
    editProduct.oldPrise = e.target.old_Prise.value
    editProduct.frame = e.target.frame.value
    editProduct.size = e.target.size.value
    editProduct.amount = e.target.amount.value
    editProduct.discountPrise = e.target.discount_prise.value
    editProduct.depth = e.target.depth.value
    editProduct.status = e.target.status.value

    let elEditBtn = document.querySelector('.edit-btn-submit')
    elEditBtn.innerHTML = ` <img class="scale-[1.5] mx-auto" src="./images/loading.png" alt="loading" width="38" height="37">`

    setTimeout(() => {
      elEditBtn.innerHTML = 'Изменить'
      elModalWrapper.classList.add('scale-0')
      renderProducts(products, elProductTable, e.target.category_Id.value)
      localStorage.setItem('products', JSON.stringify(products))

      if(e.target.category_Id.value == '0'){
        elCategory1.className = "category-1 text-[35px] text-[#009398] leading-[40.64px] pb-[8px] font-bold border-b-[3px] cursor-pointer border-[#009398]"
        elCategory2.className = "category-2 text-[35px] text-[#A6A6A6] leading-[40.64px] pb-[8px] font-bold border-b-[3px] cursor-pointer border-[#A6A6A6] border-transparent"
      }
      else{
        elCategory1.className = "category-1 text-[35px] text-[#A6A6A6] leading-[40.64px] pb-[8px] font-bold border-b-[3px] cursor-pointer border-[#A6A6A6] border-transparent"
        elCategory2.className = "category-2 text-[35px] text-[#009398] leading-[40.64px] pb-[8px] font-bold border-b-[3px] cursor-pointer border-[#009398]"
      }
    },1000)



  })

  let elErrorImg = document.querySelector('.error-img')
  elErrorImg.addEventListener('error', function(e){
    e.target.src = './images/empty-img.png'
  })

}
// edit par tend



