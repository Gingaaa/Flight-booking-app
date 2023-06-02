// // header sticky

// document.addEventListener('DOMContentLoaded', () => {
//     alert(hi)

//     "use strict";

//     const selectHeader = document.querySelector('#header');

//     if (selectHeader) {

//         document.addEventListener('scroll', () => {

//             window.scrollY > 70 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');

//         });

//     }



// });



// // tabbed content listing

// $(".tab_content").hide();

// $(".tab_content:first").show();

// /* if in tab mode */

// $("ul.tabs li").click(function () {



//     $(".tab_content").hide();

//     var activeTab = $(this).attr("rel");

//     $("#" + activeTab).fadeIn();



//     $("ul.tabs li").removeClass("active");

//     $(this).addClass("active");



//     $(".tab_drawer_heading").removeClass("d_active");

//     $(".tab_drawer_heading[rel^='" + activeTab + "']").addClass("d_active");



// });

// /* if in drawer mode */

// $(".tab_drawer_heading").click(function () {



//     $(".tab_content").hide();

//     var d_activeTab = $(this).attr("rel");

//     $("#" + d_activeTab).fadeIn();



//     $(".tab_drawer_heading").removeClass("d_active");

//     $(this).addClass("d_active");



//     $("ul.tabs li").removeClass("active");

//     $("ul.tabs li[rel^='" + d_activeTab + "']").addClass("active");

// });





// /* Extra class "tab_last" 

//    to add border to right side

//    of last tab */

// $('ul.tabs li').last().addClass("tab_last");









// class CustomSiema extends Siema {

//     hideArrows(prevArrowSelector, nextArrowSelector) {

//         if (this.currentSlide === 0) {

//             document.querySelector(prevArrowSelector).style.visibility = 'hidden';

//         } else {

//             document.querySelector(prevArrowSelector).style.visibility = 'visible';

//         }



//         const index = this.currentSlide;

//         if (index === this.innerElements.length + 1 ||

//             index + this.perPage >= this.innerElements.length) {

//             document.querySelector(nextArrowSelector).style.visibility = 'hidden';

//         } else {

//             document.querySelector(nextArrowSelector).style.visibility = 'visible';

//         }

//     }

// }



// //instantiate new extended Siema

// /******* siemaOne *******/

// let siemaOne = new CustomSiema({

//     selector: '.siemaOne',

//     onChange: function () {

//         this.hideArrows('.prevSiemaOne', '.nextSiemaOne');

//     },

//     onInit: function () {

//         this.hideArrows('.prevSiemaOne', '.nextSiemaOne');

//     },

//     perPage: {

//         1024:4,

//         390:2,

//         draggable: false,

   

// }



// });



// document.querySelector('.prevSiemaOne').addEventListener('click', () => siemaOne.prev());

// document.querySelector('.nextSiemaOne').addEventListener('click', () => siemaOne.next());





// const mySiema = new Siema({

//     perPage: {

//         420: 1,

//         1024: 2

//     }



// });

// const prev = document.querySelector('.prev');

// const next = document.querySelector('.next');



// prev.addEventListener('click', () => mySiema.prev());

// next.addEventListener('click', () => mySiema.next());





// // let showFare = new showFare({

// //     perPage: 6,

// //     });

// // popup section



// function openCity(evt, cityName) {

//   var i, listingFilter, tablinks;

//   listingFilter = document.getElementsByClassName("listingFilter");

//   for (i = 0; i < listingFilter.length; i++) {

//     listingFilter[i].style.display = "none";

//   }

//   tablinks = document.getElementsByClassName("tablinks");

//   for (i = 0; i < tablinks.length; i++) {

//     tablinks[i].className = tablinks[i].className.replace(" active", "");

//   }

//   document.getElementById(cityName).style.display = "block";

//   evt.currentTarget.className += " active";

// }

// function myFunction() {

//     var closeBtn = document.querySelectorAll(".w3-large");

//     if (closeBtn.style.display === "block") {

//       closeBtn.style.display = "none";

//     } else {

//       closeBtn.style.display = "block";

//     }

//   }