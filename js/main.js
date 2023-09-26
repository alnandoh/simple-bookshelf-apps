(() => {
  let array = [];

  function getBook(textField) {
    textField.preventDefault();
    const title = document.querySelector("#inputBookTitle"),
      author = document.querySelector("#inputBookAuthor"),
      year = document.querySelector("#inputBookYear"),
      completeChecker = document.querySelector("#inputBookIsComplete"),
      bookObject = {
        id: +new Date(),
        title: title.value,
        author: author.value,
        year: year.value,
        isComplete: completeChecker.checked,
      };
    console.log(bookObject), alert("berhasil menambahkan buku");
    array.push(bookObject), document.dispatchEvent(new Event("bookChanged"));
  }

  function search(textField) {
    textField.preventDefault();
    const searchBookTitle = document.querySelector("#searchBookTitle");
    (query = searchBookTitle.value),
      query
        ? addBook(
            array.filter(function (titleSearch) {
              return titleSearch.title
                .toLowerCase()
                .includes(query.toLowerCase());
            })
          )
        : addBook(array);
  }

  function pindahBelumSelesaiDibaca(input) {
    if (confirm("Buku selesai dibaca?") == true) {
      alert("Buku sudah selesai dibaca!");
      const n = Number(input.target.id),
        index = array.findIndex(function (e) {
          return e.id === n;
        });
      -1 !== index &&
        ((array[index] = {
          ...array[index],
          isComplete: !0,
        }),
        document.dispatchEvent(new Event("bookChanged")));
    } else {
      alert("Buku belum selesai dibaca!");
    }
  }

  function pindahSelesaiDibaca(input) {
    if (confirm("Buku belum selesai dibaca?") == true) {
      alert("Buku belum selesai dibaca!");
      const n = Number(input.target.id),
        index = array.findIndex(function (e) {
          return e.id === n;
        });
      -1 !== index &&
        ((array[index] = {
          ...array[index],
          isComplete: !1,
        }),
        document.dispatchEvent(new Event("bookChanged")));
    } else {
      alert("Buku selesai dibaca!");
    }
  }

  function hapusBuku(text) {
    if (confirm("Hapus Buku?") == true) {
      alert("Buku dihapus!");
      const bookID = Number(text.target.id),
        index = array.findIndex(function (book) {
          return book.id === bookID;
        });
      -1 !== index &&
        (array.splice(index, 1),
        document.dispatchEvent(new Event("bookChanged")));
    } else {
      alert("Dibatalkan!");
    }
  }

  function addBook(e) {
    const containerIncompleteBookshelfList = document.querySelector(
        "#incompleteBookshelfList"
      ),
      containerCompleteBookshelfList = document.querySelector(
        "#completeBookshelfList"
      );
    (containerIncompleteBookshelfList.innerHTML = ""),
      (containerCompleteBookshelfList.innerHTML = "");
    for (const book of e) {
      const bookDetails = document.createElement("article");
      bookDetails.classList.add("book_item");
      const h2Title = document.createElement("h2");
      h2Title.innerText = book.title;
      const penulis = document.createElement("p");
      penulis.innerText = "Penulis: " + book.author;
      const tahun = document.createElement("p");
      if (
        ((tahun.innerText = "Tahun: " + book.year),
        bookDetails.appendChild(h2Title),
        bookDetails.appendChild(penulis),
        bookDetails.appendChild(tahun),
        book.isComplete)
      ) {
        const divBelumSelesai = document.createElement("div");
        divBelumSelesai.classList.add("action");
        const buttonBelumSelesai = document.createElement("button");
        (buttonBelumSelesai.id = book.id),
          (buttonBelumSelesai.innerText = "Belum selesai dibaca"),
          buttonBelumSelesai.classList.add("yellow"),
          buttonBelumSelesai.addEventListener("click", pindahSelesaiDibaca);
        const buttonHapusBuku = document.createElement("button");
        (buttonHapusBuku.id = book.id),
          (buttonHapusBuku.innerText = "Hapus buku"),
          buttonHapusBuku.classList.add("red"),
          buttonHapusBuku.addEventListener("click", hapusBuku),
          divBelumSelesai.appendChild(buttonBelumSelesai),
          divBelumSelesai.appendChild(buttonHapusBuku),
          bookDetails.appendChild(divBelumSelesai),
          containerCompleteBookshelfList.appendChild(bookDetails);
      } else {
        const divSelesai = document.createElement("div");
        divSelesai.classList.add("action");
        const buttonSelesai = document.createElement("button");
        (buttonSelesai.id = book.id),
          (buttonSelesai.innerText = "Selesai dibaca"),
          buttonSelesai.classList.add("green"),
          buttonSelesai.addEventListener("click", pindahBelumSelesaiDibaca);
        const buttonHapusBukuSD = document.createElement("button");
        (buttonHapusBukuSD.id = book.id),
          (buttonHapusBukuSD.innerText = "Hapus buku"),
          buttonHapusBukuSD.classList.add("red"),
          buttonHapusBukuSD.addEventListener("click", hapusBuku),
          divSelesai.appendChild(buttonSelesai),
          divSelesai.appendChild(buttonHapusBukuSD),
          bookDetails.appendChild(divSelesai),
          containerIncompleteBookshelfList.appendChild(bookDetails);
      }
    }
  }

  function moveBook() {
    !(function (e) {
      localStorage.setItem("books", JSON.stringify(e));
    })(array),
      addBook(array);
  }

  function deleteBook() {
    alert("Buku berhasil dihapus");
  }

  window.addEventListener("load", function () {
    (array = JSON.parse(localStorage.getItem("books")) || []), addBook(array);
    const inputBook = document.querySelector("#inputBook"),
      searchBook = document.querySelector("#searchBook");
    inputBook.addEventListener("submit", getBook),
      searchBook.addEventListener("submit", search),
      document.addEventListener("bookChanged", moveBook);
  });
})();
