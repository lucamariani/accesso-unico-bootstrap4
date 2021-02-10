const $schede = $('.scheda-item')
const $filterDivArrays = $('.listing-accordion-panel')

const filter = function(filterDiv) {
    this.filterDiv = filterDiv
    this.classesArray = []
}

const listing = function() {

    const filterArray = []

    /**
     * initialize filters
     */
    const initFilterArray = function() {
        $filterDivArrays.each(function (index, item) {
            filterArray.push(new filter(item))
        })
        console.log('filterArray', filterArray)
    }

    const setSchedeCount = function (count) {
        const $countDOM = $('#counts')
        $countDOM.text(count)
    }

    const filterSchede = function () {
        console.log('hiding all schede')
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
        setSchedeCount($schede2show.length)
    }

    const getFilteredClasses = function ($filter, classesArray) {
        $checkedArgs = $filter.find('input:checked')
        console.log('$checkedArgs', $checkedArgs)
        $checkedArgs.each(function () {
            classesArray.push($(this).val())
        })
        // remove duplicates
        classesArray = classesArray.unique()
    }

    const onChangeCheckbox = function ($item, filter) {
        const arrayClasses = filter.classesArray
        console.log('changed args', $item)
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

    const addChangeHandlers = function () {
        console.log('adding ChangeHandlers for', filterArray)
        filterArray.forEach(function (item) {
            addHandlers(item)
        })
    }

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

    const addTypeChangeHandler = function () {
        console.log('adding TypeChangeHandlers...')
        const $inputs = $typeFilterDiv.find('input')

        $inputs.each(function () {
            $(this).change(function () {
                onChangeCheckbox($(this), typeClasses)
            });
        });
    }

    const addProfileChangeHandler = function () {
        console.log('adding ProfileChangeHandlers...')
        const $inputs = $profileFilterDiv.find('input')

        $inputs.each(function () {
            $(this).change(function () {
                onChangeCheckbox($(this), profileClasses)
            });
        });
    }

    initFilterArray()
    addChangeHandlers()
    setSchedeCount($schede.length)
}

listing()