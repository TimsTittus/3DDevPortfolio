import * as React from "react";

export type JsonLdNode = Record<string, unknown>;

/** Escapes characters that could terminate the surrounding <script> element. */
function serialize(data: JsonLdNode | JsonLdNode[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/**
 * Renders a JSON-LD block. `id` keeps React keys stable and makes the emitted
 * scripts easy to identify when validating with Rich Results Test.
 */
export function JsonLd({
  id,
  data,
}: {
  id: string;
  data: JsonLdNode | JsonLdNode[];
}) {
  return (
    <script
      type="application/ld+json"
      id={id}
      // eslint-disable-next-line react/no-danger -- required for JSON-LD
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
}

/** Wraps nodes in a single @graph so entities can cross-reference by @id. */
export function graph(nodes: JsonLdNode[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}
