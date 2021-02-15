const $schede = $('.scheda-item')
const $filterDivArrays = $('.listing-accordion-panel')

/**
 *
 * @param item
 * @param prefixClassName
 * @returns {*}
 */
const getClassesStartingWithString = function (item, prefixClassName) {
    // console.log('getClassesStartingWithString', prefixClassName, item)
    const regExp = new RegExp(prefixClassName,'g')
    // console.log('classes:', item.className.match(regExp))
    return item.className.match(regExp)
}

const Filter = function(filterDiv) {
    // console.log('creating filter for ', filterDiv)
    this.filterDiv = filterDiv
    this.classesArray = []
    this.name = $(this.filterDiv).data('filtername')
}

const listing = function() {

    // store the available filters
    const filterArray = []
    // store the filters name
    const filterNamesArray = []
    // store the checkboxes to show
    const checkboxes = {}

    const getFilterDivByName = function(name) {
        let div = {}
        // console.log('getFilterDivByName searching for', name)
        filterArray.forEach(function(filter) {
            // console.log('getFilterDivByName comparing with', filter.name)
            if(filter.name === name) {
                // console.log('matched with', filter.name)
                div = filter.filterDiv
            }
        })
        return div
    }

    /**
     * Reads the available filters from schede
     * For each scheda the filters are CSS classes following this
     * naming convention: filterName_filterValue
     */
    const initFilterCheckboxes = function() {
        initCheckboxes()
        const $visibleSchede = $('.scheda-item').not('.d-none')
        $visibleSchede.each(function (index, item) {
            filterArray.forEach(function (filter) {
                // console.log('filling checkboxes for filter', filter.name)
                addFilterCheckboxes(item, filter)
            })
        })

        // now cycle on checkboxes arrays to add them in dom
        Object.keys(checkboxes).forEach(function (checkboxName) {
            const checkbox = checkboxes[checkboxName]
            console.log(checkbox)
            checkbox.items.forEach(function(item) {
                $("#" + item).parent().removeClass('d-none')
            })
        })
    }

    const addCheckboxInArray = function (filterName, value) {
        if(checkboxes[filterName]) {
            if ( ! checkboxes[filterName].items.includes(value)) {
                checkboxes[filterName].items.push(value)
            }
        }
    }

    const fillCheckboxesArrays = function (filter, cssclasses) {
        cssclasses.forEach(function (cssclass) {
            // console.log('adding checkbox for cssclass', cssclass)
            addCheckboxInArray(filter.name, cssclass)
        })
    }

    /**
     *
     * @param filter
     */
    const addFilterCheckboxes = function (item, filter) {
        const prefixClassName = filter.name + '_[a-zA-Z0-9]*'
        const cssclasses = getClassesStartingWithString(item, prefixClassName)
        // console.log('adding checkboxes for filter', filter.name)

        // fill checkboxes arrays
        if(cssclasses) fillCheckboxesArrays(filter, cssclasses)
    }

    const initCheckboxes = function(filterName) {
        // init object
        filterArray.forEach(function (filter) {
            checkboxes[filter.name] = {}
            checkboxes[filter.name].items = []
        })
        // hide checkboxes
        Object.keys(checkboxes).forEach(function (checkboxName) {
            const filterDiv = getFilterDivByName(checkboxName)
            // console.log('filterDiv',filterDiv)
            $(filterDiv).find('.form-check-group').addClass('d-none')
            // $checkboxesContainer.html('')
        })
    }

    /**
     * initialize filters
     */
    const initFilterArrays = function() {
        $filterDivArrays.each(function (index, item) {
            const filter = new Filter(item)
            filterArray.push(filter)
            filterNamesArray.push(filter.name)
        })
        console.log('filterArray', filterArray)
        console.log('filterNames', filterNamesArray)
    }

    const setSchedeCount = function (count) {
        const $countDOM = $('#counts')
        $countDOM.text(count)
    }

    const filterSchede = function () {
        // console.log('hiding all schede')
        $schede.addClass('d-none')

        // if no filters, show all the schede
        $schede2show = $schede;

        // start filtering
        filterArray.forEach(function(item) {
            console.log('class array', item.classesArray)
            const itemClasses2show = item.classesArray.join()
            if (item.classesArray.length > 0) $schede2show = $schede2show.filter(itemClasses2show)
        })

        $schede2show.removeClass('d-none')

        // update schde count
        setSchedeCount($schede2show.length)

        // update filters
        initFilterCheckboxes()
    }

    const onChangeCheckbox = function ($item, filter) {
        const arrayClasses = filter.classesArray
        // console.log('changed args', $item)
        const classClicked = '.' + $item.val()
        if ($item.prop('checked')) arrayClasses.push(classClicked)
        else {
            const index = arrayClasses.indexOf(classClicked);
            if (index > -1) {
                arrayClasses.splice(index, 1);
            }
        }
        filterSchede()
    }

    /**
     * add handlers
     */
    const addChangeHandlers = function () {
        console.log('adding ChangeHandlers...')
        filterArray.forEach(function (item) {
            addHandlers(item)
        })
    }

    /**
     * add handler to inputs
     * @param filter    the filter object
     */
    const addHandlers = function (filter) {
        const $div = $(filter.filterDiv)
        console.log('add handlers for', $div)
        const $inputs = $div.find('input')

        $inputs.each(function () {
            $(this).change(function () {
                onChangeCheckbox($(this), filter)
            });
        });
    }

    initFilterArrays()
    initFilterCheckboxes()
    addChangeHandlers()
    setSchedeCount($schede.length)
}

listing()