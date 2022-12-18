import AutoComplete from 'primevue/autocomplete'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Avatar from 'primevue/avatar'
import AvatarGroup from 'primevue/avatargroup'
import Badge from 'primevue/badge'
import Button from 'primevue/button'
import Breadcrumb from 'primevue/breadcrumb'
import Calendar from 'primevue/calendar'
import Card from 'primevue/card'
import Carousel from 'primevue/carousel'
import Chart from 'primevue/chart'
import Checkbox from 'primevue/checkbox'
import Chip from 'primevue/chip'
import Chips from 'primevue/chips'
import ColorPicker from 'primevue/colorpicker'
import Column from 'primevue/column'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmPopup from 'primevue/confirmpopup'
import ContextMenu from 'primevue/contextmenu'
import DataTable from 'primevue/datatable'
import DataView from 'primevue/dataview'
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider'
import Dropdown from 'primevue/dropdown'
import Fieldset from 'primevue/fieldset'
import FileUpload from 'primevue/fileupload'
import InlineMessage from 'primevue/inlinemessage'
import Inplace from 'primevue/inplace'
import InputMask from 'primevue/inputmask'
import InputNumber from 'primevue/inputnumber'
import InputSwitch from 'primevue/inputswitch'
import InputText from 'primevue/inputtext'
import Knob from 'primevue/knob'
import Galleria from 'primevue/galleria'
import Listbox from 'primevue/listbox'
import MegaMenu from 'primevue/megamenu'
import Menu from 'primevue/menu'
import Menubar from 'primevue/menubar'
import Message from 'primevue/message'
import MultiSelect from 'primevue/multiselect'
import OrderList from 'primevue/orderlist'
import OrganizationChart from 'primevue/organizationchart'
import OverlayPanel from 'primevue/overlaypanel'
import Paginator from 'primevue/paginator'
import Panel from 'primevue/panel'
import PanelMenu from 'primevue/panelmenu'
import Password from 'primevue/password'
import PickList from 'primevue/picklist'
import ProgressBar from 'primevue/progressbar'
import Rating from 'primevue/rating'
import RadioButton from 'primevue/radiobutton'
import SelectButton from 'primevue/selectbutton'
import ScrollPanel from 'primevue/scrollpanel'
import ScrollTop from 'primevue/scrolltop'
import Slider from 'primevue/slider'
import Sidebar from 'primevue/sidebar'
import Skeleton from 'primevue/skeleton'
import SplitButton from 'primevue/splitbutton'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import Steps from 'primevue/steps'
import TabMenu from 'primevue/tabmenu'
import Tag from 'primevue/tag'
import TieredMenu from 'primevue/tieredmenu'
import Textarea from 'primevue/textarea'
import Timeline from 'primevue/timeline'
import Toast from 'primevue/toast'
import Toolbar from 'primevue/toolbar'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import ToggleButton from 'primevue/togglebutton'
import Tree from 'primevue/tree'
import TreeTable from 'primevue/treetable'
import TriStateCheckbox from 'primevue/tristatecheckbox'

import PrimeVue from 'primevue/config'

// directives
import BadgeDirective from 'primevue/badgedirective'
import Ripple from 'primevue/ripple'
import StyleClass from 'primevue/styleclass'
import Tooltip from 'primevue/tooltip'

// services
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    const app = nuxtApp.vueApp
    // directives

    app.directive('badge', BadgeDirective)
    app.directive('ripple', Ripple)
    app.directive('tooltip', Tooltip)
    app.directive('styleclass', StyleClass)

    // components
    app.component('Accordion', Accordion)
    app.component('AccordionTab', AccordionTab)
    app.component('AutoComplete', AutoComplete)
    app.component('Avatar', Avatar)
    app.component('AvatarGroup', AvatarGroup)
    app.component('Badge', Badge)
    app.component('Breadcrumb', Breadcrumb)
    app.component('Button', Button)
    app.component('Calendar', Calendar)
    app.component('Card', Card)
    app.component('Carousel', Carousel)
    app.component('Chart', Chart)
    app.component('Checkbox', Checkbox)
    app.component('Chip', Chip)
    app.component('Chips', Chips)
    app.component('ColorPicker', ColorPicker)
    app.component('Column', Column)
    app.component('ConfirmDialog', ConfirmDialog)
    app.component('ConfirmPopup', ConfirmPopup)
    app.component('ContextMenu', ContextMenu)
    app.component('DataTable', DataTable)
    app.component('DataView', DataView)
    app.component('DataViewLayoutOptions', DataViewLayoutOptions)
    app.component('Dialog', Dialog)
    app.component('Divider', Divider)
    app.component('Dropdown', Dropdown)
    app.component('Fieldset', Fieldset)
    app.component('FileUpload', FileUpload)
    app.component('InlineMessage', InlineMessage)
    app.component('Inplace', Inplace)
    app.component('InputMask', InputMask)
    app.component('InputNumber', InputNumber)
    app.component('InputSwitch', InputSwitch)
    app.component('InputText', InputText)
    app.component('Galleria', Galleria)
    app.component('Knob', Knob)
    app.component('Listbox', Listbox)
    app.component('MegaMenu', MegaMenu)
    app.component('Menu', Menu)
    app.component('Menubar', Menubar)
    app.component('Message', Message)
    app.component('MultiSelect', MultiSelect)
    app.component('OrderList', OrderList)
    app.component('OrganizationChart', OrganizationChart)
    app.component('OverlayPanel', OverlayPanel)
    app.component('Paginator', Paginator)
    app.component('Panel', Panel)
    app.component('PanelMenu', PanelMenu)
    app.component('Password', Password)
    app.component('PickList', PickList)
    app.component('ProgressBar', ProgressBar)
    app.component('RadioButton', RadioButton)
    app.component('Rating', Rating)
    app.component('SelectButton', SelectButton)
    app.component('ScrollPanel', ScrollPanel)
    app.component('ScrollTop', ScrollTop)
    app.component('Slider', Slider)
    app.component('Sidebar', Sidebar)
    app.component('Skeleton', Skeleton)
    app.component('SplitButton', SplitButton)
    app.component('Splitter', Splitter)
    app.component('SplitterPanel', SplitterPanel)
    app.component('Steps', Steps)
    app.component('TabMenu', TabMenu)
    app.component('TabView', TabView)
    app.component('TabPanel', TabPanel)
    app.component('Tag', Tag)
    app.component('Textarea', Textarea)
    app.component('TieredMenu', TieredMenu)
    app.component('Timeline', Timeline)
    app.component('Toast', Toast)
    app.component('Toolbar', Toolbar)
    app.component('ToggleButton', ToggleButton)
    app.component('Tree', Tree)
    app.component('TreeTable', TreeTable)
    app.component('TriStateCheckbox', TriStateCheckbox)

    app.use(
        PrimeVue,
        {
            ripple: true,
            inputStyle: 'filled',
            zIndex: {
                modal: 1100,        //dialog, sidebar
                overlay: 1000,      //dropdown, overlaypanel
                menu: 1000,         //overlay menus
                tooltip: 1100,      //tooltip
            },
            locale: {
                startsWith: 'Starts with',
                contains: 'Contains',
                notContains: 'Not contains',
                endsWith: 'Ends with',
                equals: 'Equals',
                notEquals: 'Not equals',
                noFilter: 'No Filter',
                lt: 'Less than',
                lte: 'Less than or equal to',
                gt: 'Greater than',
                gte: 'Greater than or equal to',
                dateIs: 'Date is',
                dateIsNot: 'Date is not',
                dateBefore: 'Date is before',
                dateAfter: 'Date is after',
                clear: 'Clear',
                apply: 'Apply',
                matchAll: 'Match All',
                matchAny: 'Match Any',
                addRule: 'Add Rule',
                removeRule: 'Remove Rule',
                accept: 'Yes',
                reject: 'No',
                choose: 'Choose',
                upload: 'Upload',
                cancel: 'Cancel',
                completed: 'Completed',
                pending: 'Pending',
                dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                chooseYear: 'Choose Year',
                chooseMonth: 'Choose Month',
                chooseDate: 'Choose Date',
                prevDecade: 'Previous Decade',
                nextDecade: 'Next Decade',
                prevYear: 'Previous Year',
                nextYear: 'Next Year',
                prevMonth: 'Previous Month',
                nextMonth: 'Next Month',
                prevHour: 'Previous Hour',
                nextHour: 'Next Hour',
                prevMinute: 'Previous Minute',
                nextMinute: 'Next Minute',
                prevSecond: 'Previous Second',
                nextSecond: 'Next Second',
                am: 'am',
                pm: 'pm',
                today: 'Today',
                weekHeader: 'Wk',
                firstDayOfWeek: 0,
                dateFormat: 'mm/dd/yy',
                weak: 'Weak',
                medium: 'Medium',
                strong: 'Strong',
                passwordPrompt: 'Enter a password',
                emptyFilterMessage: 'No results found', // @deprecated Use 'emptySearchMessage' option instead.
                searchMessage: '{0} results are available',
                selectionMessage: '{0} items selected',
                emptySelectionMessage: 'No selected item',
                emptySearchMessage: 'No results found',
                emptyMessage: 'No available options',
                aria: {
                    trueLabel: 'True',
                    falseLabel: 'False',
                    nullLabel: 'Not Selected',
                    star: '1 star',
                    stars: '{star} stars',
                    selectAll: 'All items selected',
                    unselectAll: 'All items unselected',
                    close: 'Close',
                    previous: 'Previous',
                    next: 'Next',
                    navigation: 'Navigation',
                    scrollTop: 'Scroll Top',
                    moveTop: 'Move Top',
                    moveUp: 'Move Up',
                    moveDown: 'Move Down',
                    moveBottom: 'Move Bottom',
                    moveToTarget: 'Move to Target',
                    moveToSource: 'Move to Source',
                    moveAllToTarget: 'Move All to Target',
                    moveAllToSource: 'Move All to Source',
                    pageLabel: '{page}',
                    firstPageLabel: 'First Page',
                    lastPageLabel: 'Last Page',
                    nextPageLabel: 'Next Page',
                    prevPageLabel: 'Previous Page',
                    rowsPerPageLabel: 'Rows per page',
                    previousPageLabel: 'Previous Page',
                    jumpToPageDropdownLabel: 'Jump to Page Dropdown',
                    jumpToPageInputLabel: 'Jump to Page Input',
                    selectRow: 'Row Selected',
                    unselectRow: 'Row Unselected',
                    expandRow: 'Row Expanded',
                    collapseRow: 'Row Collapsed',
                    showFilterMenu: 'Show Filter Menu',
                    hideFilterMenu: 'Hide Filter Menu',
                    filterOperator: 'Filter Operator',
                    filterConstraint: 'Filter Constraint',
                    editRow: 'Row Edit',
                    saveEdit: 'Save Edit',
                    cancelEdit: 'Cancel Edit',
                    listView: 'List View',
                    gridView: 'Grid View',
                    slide: 'Slide',
                    slideNumber: '{slideNumber}',
                    zoomImage: 'Zoom Image',
                    zoomIn: 'Zoom In',
                    zoomOut: 'Zoom Out',
                    rotateRight: 'Rotate Right',
                    rotateLeft: 'Rotate Left'
                }
            }
        }
    )

    // services
    app.use(ConfirmationService)
    app.use(ToastService)
})