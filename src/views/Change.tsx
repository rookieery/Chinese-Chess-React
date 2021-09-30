export default function Change() {
    return (
        <article className="article">
            <h2>更新日志</h2>
            <section>
                <section>
                    <h3>V1.0.0 2021-09-30</h3>
                    <p>
                        <ul>
                            <li>使用react hooks框架和Ant Design UI界面，更加方便友好</li>
                            <li>新增设置页面，可进行游戏功能设置</li>
                            <li>新增查看棋谱功能</li>
                            <li>修复绝杀算法中会产生自杀式绝杀误判的bug</li>
                        </ul>
                    </p>
                </section>
            </section>
        </article>
    );
}