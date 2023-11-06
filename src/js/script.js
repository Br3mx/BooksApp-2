
{
  ("use strict");

  const booksList = document.querySelector(".books-list");
  const booksTemplate = Handlebars.compile(
    document.querySelector("#template-book").innerHTML
  );
  const form = document.querySelector('.filters');


  function render() {
    for (let book of dataSource.books) {
      const generatedHTML = booksTemplate(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      booksList.appendChild(generatedDOM);
    }
  }

  render();

  const favoriteBooks = [];

  const filters = [];

  function initAction() {
    const bookImages = booksList.querySelectorAll('.book__image');
    
    for (let bookImage of bookImages) {
      bookImage.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const clickedBook = event.target.closest('a');
        const bookId = clickedBook.getAttribute('data-id');
        if(!favoriteBooks.includes(bookId)){
          clickedBook.classList.add('favorite');
          
          favoriteBooks.push(bookId);
        } else {
            clickedBook.classList.remove('favorite');
        }
      });
      form.addEventListener('click', function (event) {
        if (event.target.tagName == 'INPUT' 
            && event.target.type == 'checkbox' && event.target.name == 'filter') {
            console.log(event.target.value)
        }
        if (event.target.checked) {
            filters.push(event.target.value);
          } else {
            const indexOfFilter = filters.indexOf(event.target.value);
            filters.splice(indexOfFilter, 1);
          }

          filterBooks();
    });
    
   }
  }

  initAction();

  function filterBooks(){
    for (let book of dataSource.books) {
        let shouldBeHidden = false;
        for (let filter of filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        const filteredBook = document.querySelector('.book__image[data-id="' + book.id + '"]');
        if (shouldBeHidden) {
          filteredBook.classList.add('hidden');
        } else {
          filteredBook.classList.remove('hidden');
        }
      }
    }
    
  

}
