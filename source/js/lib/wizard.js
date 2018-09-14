var form = $("#form-wizard").show();
form.steps({
    headerTag: "h3",
    bodyTag: "fieldset",
    transitionEffect: "slideLeft",
    labels: {
        cancel: "Cancel",
        current: "",
        pagination: "Pagination",
        finish: "Готово",
        next: "Наступний крок",
        previous: "Повернутись назад",
        loading: "Loading ..."
    },
    onStepChanging: function (event, currentIndex, newIndex)
    {
        // Allways allow previous action even if the current form is not valid!
        if (currentIndex > newIndex)
        {
            return true;
        }
        // Needed in some cases if the user went back (clean up)
        if (currentIndex < newIndex)
        {
            // To remove error styles
            form.find(".body:eq(" + newIndex + ") label.error").remove();
            form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
        }
        form.validate().settings.ignore = ":disabled,:hidden";
        return form.valid();
    },
    onStepChanged: function (event, currentIndex, priorIndex)
    {
        // Used to skip the "Warning" step if the user is old enough.
        if (currentIndex === 2 && Number($("#age-2").val()) >= 18)
        {
            form.steps("next");
        }
        // Used to skip the "Warning" step if the user is old enough and wants to the previous step.
        if (currentIndex === 2 && priorIndex === 3)
        {
            form.steps("previous");
        }
    },
    onFinishing: function (event, currentIndex)
    {
        form.validate().settings.ignore = ":disabled";
        return form.valid();
    },
    onFinished: function (event, currentIndex)
    {
        alert("Submitted!");
    }
}).validate({
    errorPlacement: function errorPlacement(error, element) { element.before(error); },
    rules: {
        password: {
            minlength: 6
        },
        confirm: {
            equalTo: "#password-2"
        }
    }
});
$(function () {
    var sequenceNumber = 0;
    $('#add-schedule-row').click(function(){
        if(sequenceNumber > 10 ){
            return null
        }
        sequenceNumber++;
        $('.schedule-row:last-child').after(`<div class=" schedule-row form-inline m-b-1 d-flex justify-content-between"><div class="form-group"><select name="schedule[${sequenceNumber}][day]" class="form-control"><option selected="selected" disabled="disabled">Виберіть день</option><option value="1">Понедельник</option><option value="2">Вторник</option><option value="3">Среда</option><option value="4">Четверг</option><option value="5">Пятница</option><option value="6">Суббота</option><option value="7">Воскресенье</option><option value="8">Будние</option><option value="9">Выходные</option><option value="10">Любой день</option></select></div><label class="m-l-1 m-r-1 m-b-0">c</label><div class="form-group"><select name="schedule[${sequenceNumber}][from]" class="form-control"><option selected="selected" disabled="disabled">Виберіть час</option><option value="0">00</option><option value="1">01</option><option value="2">02</option><option value="3">03</option><option value="4">04</option><option value="5">05</option><option value="6">06</option><option value="7">07</option><option value="8">08</option><option value="9">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option></select></div><label class="m-l-1 m-r-1 m-b-0">до</label><div class="form-group"><select name="schedule[${sequenceNumber}][to]" class="form-control"><option selected="selected" disabled="disabled">Виберіть час</option><option value="0">00</option><option value="1">01</option><option value="2">02</option><option value="3">03</option><option value="4">04</option><option value="5">05</option><option value="6">06</option><option value="7">07</option><option value="8">08</option><option value="9">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option></select></div><div class="form-group"><button type="button" class="btn btn-remove btn-sm btn-warning m-l-1"></button></div></div>`)
    });
    $('#schedule').click(function(e){
        if(e.target.classList.contains('btn-remove')) {
            e.target.closest('.schedule-row').remove();
            sequenceNumber--;
        }
    });
});