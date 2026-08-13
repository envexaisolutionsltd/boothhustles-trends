import { faqs } from "@/lib/azotea";

/**
 * Native <details> accordion — works with JavaScript disabled and keeps the
 * answers in the initial HTML so search engines index them.
 */
export default function FaqList({ limit }: { limit?: number }) {
  const items = typeof limit === "number" ? faqs.slice(0, limit) : faqs;

  return (
    <div>
      {items.map((item, index) => (
        <details key={item.q} className="az-acc" name="azotea-faq" open={index === 0}>
          <summary>
            <span>{item.q}</span>
            <span className="az-acc-icon" aria-hidden="true" />
          </summary>
          <div className="az-acc-body">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
