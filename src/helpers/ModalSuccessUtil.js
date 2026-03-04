export class ModalSuccessUtil {
  static modalRef;

  static setModalRef = (ref) => {
    this.modalRef = ref;
  };

  static showModal = (message) => {
    if (this.modalRef?.current) {
      this.modalRef.current.show(message);
    }
  };

  static hideModal = () => {
    if (this.modalRef?.current) {
      this.modalRef.current.hide();
    }
  };
}