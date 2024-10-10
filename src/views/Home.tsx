import { Panel, Placeholder } from "rsuite"
const bodyProps = {
    style: {
        height: 300
    }
};
export const Home = () => {
    return (
        <>
            <Panel header="Betsy Jazmine Tubay Sucunota (Amor de mi vida <3)">
                <Placeholder.Paragraph />
            </Panel>
            <Panel header="Scroll Shadow" scrollShadow bodyProps={bodyProps}>
                <div style={{ padding: 20 }}>
                    <Placeholder.Paragraph rows={20} graph="image" />
                    <Placeholder.Paragraph rows={20} graph="image" />
                    <Placeholder.Paragraph rows={20} graph="image" />
                    <Placeholder.Paragraph rows={20} graph="image" />
                    <Placeholder.Paragraph rows={20} graph="image" />
                    <Placeholder.Paragraph rows={20} graph="image" />
                </div>
            </Panel>
        </>
    )
}