
<script template_new>
    <div data-reactroot="">
        <header class="header">
            <h1>todos 3</h1><input class="new-todo" placeholder="What needs to be done?"></header>
            <section class="main"><input type="checkbox" class="toggle-all">
                <ul class="todo-list">
                    <li class="">
                        <div class="view"><input type="checkbox" class="toggle">
                            <label>Todo 1</label>
                            <button class="destroy"></button>
                        </div><input class="edit">
                    </li>
                    <li class="">
                        <div class="view"><input type="checkbox" class="toggle">
                            <label>Todo 2</label>
                            <button class="destroy"></button>
                        </div><input class="edit">
                    </li>
                    <li class="">
                        <div class="view"><input type="checkbox" class="toggle">
                            <label>Todo 3</label>
                            <button class="destroy"></button>
                        </div><input class="edit">
                    </li>
                    <li class="">
                        <div class="view"><input type="checkbox" class="toggle">
                            <label>Todo 4</label>
                            <button class="destroy"></button>
                        </div><input class="edit">
                    </li>
                    <li class="">
                        <div class="view"><input type="checkbox" class="toggle">
                            <label>Todo 5</label>
                            <button class="destroy"></button>
                        </div><input class="edit">
                    </li>
                    <li class="">
                        <div class="view"><input type="checkbox" class="toggle">
                            <label>Todo 6</label>
                            <button class="destroy"></button>
                        </div><input class="edit">
                    </li>
                </ul>
            </section>

        <footer class="footer">
            <span class="todo-count">
                <strong>6</strong>
                items left
            </span>
            <ul class="filters">
                <li>
                    <a href="#/" class="selected">All</a>
                </li>
                <li>
                    <a href="#/active" class="">Active</a>
                </li>

                <li>
                    <a href="#/completed" class="">Completed</a>
                </li>
            </ul>
        </footer>
    </div>
</script>

<script state>
    rows: [],
    selected: undefined
</script>

<script>
    init() {
        this.ShadowDOM = false;
    }
    connected() {

    }
    rowClass(row) {
        return row.id === this.state.selected ? 'danger' : '';
    }
    renderWithNewState() {
        this.state.rows = this.store.data;
        this.state.selected = this.store.selected;
        this.render();
    }

</script>
