/*
 * three main filters: Argomento, tipologia, profilo
 * each main filter option creates an OR filter
 * each main filter condition must be in AND
 */

const $schede = $('.scheda-item')

const $argomentoFilterDiv = $('#accordion-panel-argomento')
const $typeFilterDiv = $('#accordion-panel-tipologia')
const $profileFilterDiv = $('#accordion-panel-profilo')

const argsClasses = []
const typeClasses = []
const profileClasses = []

const setSchedeCount = function(count) {
    $countDOM = $('#counts')
    $countDOM.text(count)
}

const filterSchede = function() {
    console.log('hiding all schede')
    $schede.addClass('d-none')

    argomentiClasses2show = argsClasses.join()
    typeClasses2show = typeClasses.join()
    profileClasses2show = profileClasses.join()

    // if no filters, show all the schede
    $schede2show = $schede;

    // filter arguments
    if(argsClasses.length > 0) $schede2show = $schede2show.filter(argomentiClasses2show)
    // filter types
    if(typeClasses.length > 0) $schede2show = $schede2show.filter(typeClasses2show)
    // filter profiles
    if(profileClasses.length > 0) $schede2show = $schede2show.filter(profileClasses2show)

    $schede2show.removeClass('d-none')
    setSchedeCount($schede2show.length)
}

const getFilteredClasses = function($filter, classesArray) {
    $checkedArgs = $filter.find('input:checked')
    console.log('$checkedArgs', $checkedArgs)
    $checkedArgs.each(function () {
        classesArray.push($(this).val())
    })
    // remove duplicates
    classesArray = classesArray.unique()
}

const onChangeCheckbox = function ($item, arrayClasses) {
    console.log('changed args', $item)
    const classClicked = '.' + $item.val()
    if($item.prop('checked')) arrayClasses.push(classClicked)
    else {
        const index = arrayClasses.indexOf(classClicked);
        if (index > -1) {
            arrayClasses.splice(index, 1);
        }
    }
    filterSchede()
}

const addChangeHandlers = function() {
    console.log('adding ChangeHandlers...')
    addArgsChangeHandler()
    addTypeChangeHandler()
    addProfileChangeHandler()
}

const addArgsChangeHandler = function () {
    console.log('adding ArgsChangeHandlers...')
    const $inputs = $argomentoFilterDiv.find('input')

    $inputs.each(function() {
        $(this).change(function() {
            onChangeCheckbox($(this), argsClasses)
        });
    });
}

const addTypeChangeHandler = function () {
    console.log('adding TypeChangeHandlers...')
    const $inputs = $typeFilterDiv.find('input')

    $inputs.each(function() {
        $(this).change(function() {
            onChangeCheckbox($(this), typeClasses)
        });
    });
}

const addProfileChangeHandler = function () {
    console.log('adding ProfileChangeHandlers...')
    const $inputs = $profileFilterDiv.find('input')

    $inputs.each(function() {
        $(this).change(function() {
            onChangeCheckbox($(this), profileClasses)
        });
    });
}

$( document ).ready(function () {
    addChangeHandlers()
    setSchedeCount($schede.length)
});