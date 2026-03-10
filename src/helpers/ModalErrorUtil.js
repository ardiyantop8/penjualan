export class ModalErrorUtil {
  static modalRef;

  static setModalRef = (ref) => {
    this.modalRef = ref;
  };

  static showModal = (message = "Terjadi kesalahan", onConfirm = () => {}) => {
    if (this.modalRef?.current) {
      this.modalRef.current.show(message, onConfirm);
    }
  };

  static hideModal = () => {
    if (this.modalRef?.current) {
      this.modalRef.current.hide();
    }
  };
}
