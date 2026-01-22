import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./page";
import publicationsData from "../../data/publications.json";

type Publication = {
  title: { ja: string; en: string };
  peerReviewed: boolean;
};

describe("Home page", () => {
  it("shows Japanese content by default", () => {
    render(<Home />);

    expect(document.title).toBe("研究者ホームページ | 植田 雄士");
    expect(screen.getByRole("heading", { level: 1, name: "植田 雄士" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "JA" })).toHaveAttribute("aria-pressed", "true");
  });

  it("switches language to English when EN is selected", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole("button", { name: "EN" }));

    expect(document.title).toBe("Research Portfolio | Yuji Ueda");
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
});
