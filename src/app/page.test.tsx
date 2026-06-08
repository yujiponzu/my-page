import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./page";
import publicationsData from "../../data/publications.json";

type Publication = {
  title: { ja: string; en: string };
  category: "journal" | "international_conference" | "domestic_conference";
  peerReviewed: boolean;
  volume?: string;
  number?: string;
  pages?: string;
  location?: { ja: string; en: string };
};

describe("Home page", () => {
  it("shows Japanese content by default", () => {
    render(<Home />);

    expect(document.title).toBe("植田雄士のホームページ | 植田 雄士");
    expect(screen.getByRole("heading", { level: 1, name: "植田 雄士" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "JA" })).toHaveAttribute("aria-pressed", "true");
  });

  it("switches language to English when EN is selected", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole("button", { name: "EN" }));

    expect(document.title).toBe("Yuji Ueda's Page | Yuji Ueda");
    expect(screen.getByRole("heading", { level: 1, name: "Yuji Ueda" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EN" })).toHaveAttribute("aria-pressed", "true");
  });

  it("shows peer review badge only for peer-reviewed publications", () => {
    const publications = publicationsData as Publication[];
    const reviewed = publications.find((p) => p.peerReviewed);
    const nonReviewed = publications.find((p) => !p.peerReviewed);

    if (!reviewed || !nonReviewed) {
      throw new Error("Publication data missing peer-reviewed or non peer-reviewed entry");
    }

    render(<Home />);

    const reviewedHeading = screen.getByText(reviewed.title.ja);
    const reviewedItem = reviewedHeading.closest("li");
    if (!reviewedItem) {
      throw new Error("Peer-reviewed publication element not found");
    }
    expect(within(reviewedItem).getByText("査読有")).toBeInTheDocument();

    const nonReviewedHeading = screen.getByText(nonReviewed.title.ja);
    const nonReviewedItem = nonReviewedHeading.closest("li");
    if (!nonReviewedItem) {
      throw new Error("Non peer-reviewed publication element not found");
    }
    expect(within(nonReviewedItem).queryByText("査読有")).toBeNull();
  });

  it("shows publication metadata when available", async () => {
    const publication = (publicationsData as Publication[]).find(
      (p) => p.category !== "journal" && p.pages && p.location,
    );

    if (!publication?.pages || !publication.location) {
      throw new Error("Publication data missing metadata entry");
    }

    const user = userEvent.setup();
    render(<Home />);

    const jaHeading = screen.getByText(publication.title.ja);
    const jaItem = jaHeading.closest("li");
    if (!jaItem) {
      throw new Error("Publication element not found");
    }

    expect(
      within(jaItem).getByText(`p.${publication.pages}, ${publication.location.ja}`),
    ).toBeInTheDocument();
    expect(within(jaItem).queryByText(/vol\./)).toBeNull();
    expect(within(jaItem).queryByText(/no\./)).toBeNull();

    await user.click(screen.getByRole("button", { name: "EN" }));

    const enHeading = screen.getByText(publication.title.en);
    const enItem = enHeading.closest("li");
    if (!enItem) {
      throw new Error("Publication element not found after language switch");
    }

    expect(
      within(enItem).getByText(`p.${publication.pages}, ${publication.location.en}`),
    ).toBeInTheDocument();
  });
});
