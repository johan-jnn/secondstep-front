export default function closeAside() {
  history.go(-1);
  window.location.hash = '';
}
