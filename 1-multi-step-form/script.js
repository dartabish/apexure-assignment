$(document).ready(function () {
  function initializeSteps() {
    $("#step-1").show();
    $("#step-2, #step-3").hide();
  }

  function toggleSteps(currentStep, nextStep, isNext = true) {
    const currentIndicator = $(".indicator.active");
    const newIndicator = isNext
      ? currentIndicator.next(".indicator")
      : currentIndicator.prev(".indicator");

    currentIndicator.removeClass("active");
    newIndicator.addClass("active");

    currentStep.fadeOut(300, function () {
      currentStep.hide();
      nextStep.fadeIn(300).show();
    });
  }

  function validateInput(input) {
    const value = input.val().trim();
    const errorMessage = input.next(".error-message");
    const isRequired = input.prop("required");

    errorMessage.hide();

    if (isRequired && value === "") {
      errorMessage.text("This field is required").show();
      return false;
    }

    if (input.attr("type") === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        errorMessage.text("Please enter a valid email address").show();
        return false;
      }
    }

    return true;
  }

  function validateStep(step) {
    let isValid = true;

    step.find("input, select").each(function () {
      const input = $(this);
      if (!validateInput(input)) isValid = false;
    });
    if (step.attr("id") === "step-2") {
      const preference = $("#preference").val();

      if (
        preference === "tech" &&
        $("#programming-language").val().trim() === ""
      ) {
        $("#programming-language")
          .next(".error-message")
          .text("Please select a programming language")
          .show();
        isValid = false;
      }

      if (preference === "health" && $("#diet").val().trim() === "") {
        $("#diet")
          .next(".error-message")
          .text("Please choose a dietary preference")
          .show();
        isValid = false;
      }

      if (preference === "education" && $("#degree").val().trim() === "") {
        $("#degree")
          .next(".error-message")
          .text("Please choose your highest degree")
          .show();
        isValid = false;
      }
    }

    return isValid;
  }

  function displaySummary() {
    const name = $("#name").val();
    const email = $("#email").val();
    const preference = $("#preference").val();
    const additionalInfo =
      preference === "tech"
        ? $("#programming-language").val()
        : preference === "health"
        ? $("#diet").val()
        : $("#degree").val();

    $("#submitted-name").val(name);
    $("#submitted-email").val(email);
    $("#submitted-category").val(preference);
    $("#submitted-preference").val(additionalInfo);
  }

  $(".next-btn").click(function (e) {
    e.preventDefault();

    const currentStep = $(this).closest(".step");
    const nextStep = currentStep.next(".step");

    if (validateStep(currentStep)) {
      toggleSteps(currentStep, nextStep, true);
      if (nextStep.attr("id") === "step-3") displaySummary();
    }
  });

  $(".prev-btn").click(function () {
    const currentStep = $(this).closest(".step");
    const prevStep = currentStep.prev(".step");

    toggleSteps(currentStep, prevStep, false);
  });

  $("#preference").change(function () {
    const category = $(this).val();

    $(".additional-fields").hide();
    if (category === "tech") $(".tech-fields").show();
    else if (category === "health") $(".health-fields").show();
    else if (category === "education") $(".education-fields").show();
  });
  initializeSteps();
});
