export class ModalLoadingUtil {
  static modalRef;

  static setModalRef = (ref) => {
    this.modalRef = ref;
  };

  static showModal = () => {
    if (this.modalRef?.current) {
      this.modalRef.current.show();
    }
  };

  static hideModal = () => {
    if (this.modalRef?.current) {
      this.modalRef.current.hide();
    }
  };
}