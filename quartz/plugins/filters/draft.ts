import { QuartzFilterPlugin } from "../types"

export const RemoveDrafts: QuartzFilterPlugin<{}> = () => ({
  name: "RemoveDrafts",
  shouldPublish(_ctx, [_tree, vfile]) {
    const draftFlag: boolean =
      vfile.data?.frontmatter?.draft === true || vfile.data?.frontmatter?.draft === "true"
    const publishFlag: boolean =
      vfile.data?.frontmatter?.publish === true || vfile.data?.frontmatter?.publish === "true"
    // Exclude if draft OR if publish is not explicitly true
    return !draftFlag && publishFlag
  },
})

