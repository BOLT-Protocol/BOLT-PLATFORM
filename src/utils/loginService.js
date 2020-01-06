import produce from 'immer';

export function setInput({ key, value, valid }) {
    let { page } = this.state;

    // fullback to page 1
    if (!page) page = 1;

    this.setState(
        produce(draft => {
            draft[`page${page}`][key].value = value;
            draft[`page${page}`][key].valid = valid;

            if (valid) {
                draft[`page${page}`][key].showError = false;
            }

            // if input password
            // and need to reply password
            // and replyPassword aready has value
            if (key === 'password' && draft[`page${page}`].replyPassword && valid && draft[`page${page}`].replyPassword.value !== '') {
                // if password value === replyPassword value, set replyPassword valid
                draft[`page${page}`].replyPassword.valid = draft[`page${page}`].replyPassword.value === value;
            }
        }),
        () => {
            // eslint-disable-next-line no-console
            // console.log(this.state);
        }
    );
}

export function handleStep(step, check = true) {
    // step: go to step
    // check: should check valid ? for back feature

    const { page } = this.state;

    // eslint-disable-next-line react/destructuring-assignment
    const checkedPage = this.state[`page${page}`];

    // check all validation
    for (let el in checkedPage) {
        // eslint-disable-next-line react/destructuring-assignment
        if (!checkedPage[el].valid && check) {
            this.setState(
                produce(draft => {
                    draft[`page${page}`][el].showError = true;
                })
            );
            return false;
        }
    }

    this.setState(
        produce(draft => {
            draft.page = step;
        })
    );
}
