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
  const hideUserMenu = function() {
    $('li.demo').addClass('d-none')
  }

  // show menu entries
  const showUserMenu = function(role) {
    console.log('showUserMenu for', role)
    // remove all user's entries
    hideUserMenu()
    // menu entries selector
    const selector = 'li.' + role
    $(selector).removeClass('d-none')
  }

  const enableMenuPopupClick = function() {
      $('li[data-megamenu-class~="user-menu-popup-btn"] > a').add('.user-menu-popup-btn a').click(function() {
        const popupBtn = $(this).attr('popup-btn') + 'Btn'
        console.log('popupBtn: ' + popupBtn)
        $('#' + popupBtn).click()
      })
  }

  const loginWithRole = function (role) {
    // add loggedin status
    Cookies.set(USER_STATUS_COOKIE, role, { sameSite:'strict' })
    location.reload()
  }

  var enableLoginClick = function() {
    $('#user-login-btns button').click(function() {
      // console.log('login clicked...');
      const role = $(this).attr('user-role')
      console.log('user role: ' + role)
      loginWithRole(role)
    })
  }

  var enableLogoutClick = function() {
    $('.logout-icon-class').click(function() {
      console.log('logout clicked...');
      // add loggedin status
      Cookies.set(USER_STATUS_COOKIE, 0, { sameSite:'strict' })
      location.reload()
    })
  }

  // on load menu entries should be hided
  // if USER_STATUS_COOKIE is not 1
  var startVisibility = function() {
    const userLogged = Cookies.get(USER_STATUS_COOKIE) || 0
    console.log('userLogged with role', userLogged)

    if ( userLogged != 0 ) {
      console.log('setting logout content...');
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

  const getUserText = function(role) {
    let html = '';
    switch (role) {
      case 'pa':
        html = 'Gianni Verdi – Comune di Cittadella'
        break;
      case 'private':
        html = 'Mario Rossi'
        break;
    }

    return html;
  }

  const setLogoutContentMask = function(role) {
    console.log('show logged in mask')

    showUserMenu(role)

    $('#user-name').html(getUserText(role))
    $('.logout-mask').show()
  }



})(Users)
