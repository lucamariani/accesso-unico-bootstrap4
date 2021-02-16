window.Users = window.Users || {};

/**
 * Favorites
 *
 * This module is used to simulate user's login and grants.
 * It uses a cookie to save them.
 *
 * @module Users
 */

(function (exports) {

  const USER_STATUS_COOKIE = 'user_status'

  // onload
  exports.initialize = function() {
    _bindEventHandlers()
  }

  function _bindEventHandlers() {
    startVisibility()
    enableLoginClick()
    enableLogoutClick()
    enableMenuPopupClick()
  }

  // hide
  var hideUserMenu = function() {
    $('.only-loggedin').removeClass('Megamenu-item')
  }

  const showMobileMenuEntry = function(roleClass) {
    const entries = $('li[data-megamenu-class~="' + roleClass + '"]')
    var dataMegamenuClass = entries.attr('data-megamenu-class').replace('only-loggedin','');
    console.log('setting ' + dataMegamenuClass)
    entries.attr('data-megamenu-class', dataMegamenuClass)
  }

  const addNameOnMobile = function(name) {
    const icon = '<img style="height:15px" src="/accesso-unico/assets/images/icons/man.png">'
    $('.Offcanvas-toggleContainer').append('<span class="user-name-mobile u-text-xs">' + icon + ' ' + name +'</span>')
  }

  // show
  var showUserMenu = function(role) {
    // remove all user's entries
    hideUserMenu()
    // then shows only the role granted
    switch (role) {
      case 'pa':
        // add name on desktop
        const paName = 'Gianni Verdi – Comune di Cittadella'
        $('.user-name-class').text(paName);
        // add name on mobile
        addNameOnMobile(paName)
        // show on desktop
        $('.user-pa-entry').addClass('Megamenu-item')
        // show on mobile
        showMobileMenuEntry('user-pa-entry')
        break;
      case 'private':
        const privateName = 'Mario Rossi'
        $('.user-name-class').text(privateName);
        // add name on mobile
        addNameOnMobile(privateName)
        // desktop
        $('.user-private-entry').addClass('Megamenu-item')
        // show on mobile
        showMobileMenuEntry('user-private-entry')
        break;

      default:

    }
  }

  const enableMenuPopupClick = function() {
      $('li[data-megamenu-class~="user-menu-popup-btn"] > a').add('.user-menu-popup-btn a').click(function() {
        const popupBtn = $(this).attr('popup-btn') + 'Btn'
        console.log('popupBtn: ' + popupBtn)
        $('#' + popupBtn).click()
      })
  }

  // const enableListViewClick = function() {
  //   $('#login-btn').click(function() {
  //     console.log('toggling users list...')
  //     $('#users-list').toggle()
  //   })
  // }

  var enableLoginClick = function() {
    $('.users-list-class li').click(function() {
      console.log('login clicked...');
      const role = $(this).attr('user-role')
      console.log('user role: ' + role)
      // hide listing
      $('#users-list').hide()
      // add loggedin status
      Cookies.set(USER_STATUS_COOKIE, role)
      location.reload()
    })
  }

  var enableLogoutClick = function() {
    $('.logout-icon-class').click(function() {
      console.log('logout clicked...');
      // add loggedin status
      Cookies.set(USER_STATUS_COOKIE, 0)
      location.reload()
    })
  }

  // on load menu entries should be hided
  // if USER_STATUS_COOKIE is not 1
  var startVisibility = function() {
    const userLogged = Cookies.get(USER_STATUS_COOKIE) || 0
    console.log('userLogged status: ' + userLogged)

    if ( userLogged != 0 ) {
      console.log('setting logout content...');
      // switchLoginClass()
      setLogoutContentMask(userLogged)
    } else {
      setLoginContentMask()
      hideUserMenu()
    }
  }

  var setLoginContentMask = function() {
      // hide logout mask
      $('.logout-mask').hide()
      $('.Headroom-showme.logout-mask').css('max-height',0)
      $('.login-mask').show()
  }

  var setLogoutContentMask = function(role) {
    console.log('setLogoutContentMask')
    showUserMenu(role)

    // hide login mask
    $('.login-mask').hide()
    $('.Headroom-showme.login-mask').css('max-height', '0')
    $('.logout-mask').show()
    $('.Headroom-showme.logout-mask').css('max-height', '5em')

    //hide on mobile
    $('.Treeview .users-list-class').css('height',0)
    $('.Treeview .login-mask').text('ESCI')
    $('.Treeview .login-mask').addClass('logout-icon-class')
  }



})(Users)
