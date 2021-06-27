export const addPadBorder = (ref) => {
    ref.classList.add("pad");
    ref.classList.remove("valid");
    ref.classList.remove("not-valid");
};

export const addValidBorder = (ref) => {
    ref.classList.add("valid");
    ref.classList.remove("not-valid");
    ref.classList.remove("pad");
};

export const addNotValidBorder = (ref) => {
    ref.classList.add("not-valid");
    ref.classList.remove("valid");
    ref.classList.remove("pad");
};

export const changeErrorTextColor = (ref, value = false) => {
    if (value) {
        ref.classList.add("greenText");
        ref.classList.remove("redText");
    } else {
        ref.classList.add("redText");
        ref.classList.remove("greenText");
    }
};
