import './styles/emailInbox.scss';

export default function EmailInbox({caption}: {caption?: string}) {
  return (
    <form className="emailInbox">
      <input
        type="email"
        name="email"
        id="email"
        placeholder={caption || 'Enter your email here!'}
        required
      />
      <button type="submit">Souscrire</button>
    </form>
  );
}
