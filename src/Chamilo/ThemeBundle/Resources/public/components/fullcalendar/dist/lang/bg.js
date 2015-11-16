!function (a) {
    "function" == typeof define && define.amd ? define(["jquery", "moment"], a) : a(jQuery, moment)
}(function (a, b) {
    (b.defineLocale || b.lang).call(b, "bg", {
        months: "януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split("_"),
        monthsShort: "янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"),
        weekdays: "неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split("_"),
        weekdaysShort: "нед_пон_вто_сря_чет_пет_съб".split("_"),
        weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "LT:ss",
            L: "D.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY LT",
            LLLL: "dddd, D MMMM YYYY LT"
        },
        calendar: {
            sameDay: "[Днес в] LT",
            nextDay: "[Утре в] LT",
            nextWeek: "dddd [в] LT",
            lastDay: "[Вчера в] LT",
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 6:
                        return "[В изминалата] dddd [в] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[В изминалия] dddd [в] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "след %s",
            past: "преди %s",
            s: "няколко секунди",
            m: "минута",
            mm: "%d минути",
            h: "час",
            hh: "%d часа",
            d: "ден",
            dd: "%d дни",
            M: "месец",
            MM: "%d месеца",
            y: "година",
            yy: "%d години"
        },
        ordinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
        ordinal: function (a) {
            var b = a % 10, c = a % 100;
            return 0 === a ? a + "-ев" : 0 === c ? a + "-ен" : c > 10 && 20 > c ? a + "-ти" : 1 === b ? a + "-ви" : 2 === b ? a + "-ри" : 7 === b || 8 === b ? a + "-ми" : a + "-ти"
        },
        week: {dow: 1, doy: 7}
    }), a.fullCalendar.datepickerLang("bg", "bg", {
        closeText: "затвори",
        prevText: "&#x3C;назад",
        nextText: "напред&#x3E;",
        nextBigText: "&#x3E;&#x3E;",
        currentText: "днес",
        monthNames: ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"],
        monthNamesShort: ["Яну", "Фев", "Мар", "Апр", "Май", "Юни", "Юли", "Авг", "Сеп", "Окт", "Нов", "Дек"],
        dayNames: ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота"],
        dayNamesShort: ["Нед", "Пон", "Вто", "Сря", "Чет", "Пет", "Съб"],
        dayNamesMin: ["Не", "По", "Вт", "Ср", "Че", "Пе", "Съ"],
        weekHeader: "Wk",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    }), a.fullCalendar.lang("bg", {
        buttonText: {
            month: "Месец",
            week: "Седмица",
            day: "Ден",
            list: "График"
        }, allDayText: "Цял ден", eventLimitText: function (a) {
            return "+още " + a
        }
    })
});
