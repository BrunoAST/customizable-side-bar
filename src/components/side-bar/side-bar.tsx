import { Component, Event, EventEmitter, h, Prop } from "@stencil/core";
import { MenuItems } from "./types/menu-items";
import 'ionicons';

@Component({
  tag: "rh-side-bar",
  styleUrl: "./side-bar.scss",
  shadow: true,
  assetsDirs: ["assets"]
})
export class SideBar {
  containerRef: HTMLElement;
  backdropRef: HTMLElement;
  mainContentRef: HTMLElement;

  @Prop({ attribute: "menu-items", mutable: true, reflect: true }) menuItems: MenuItems[] = [];

  @Event() isCollapsed: EventEmitter<boolean>;

  toggle(): void {
    this.containerRef.classList.toggle("container__collapsed");
    const isCollapsed = this.containerRef.classList.contains("container__collapsed");
    this.mainContentRef.classList.toggle("main-content__collapsed", isCollapsed);
    this.backdropRef.classList.toggle("backdrop__active", !isCollapsed);
    this.isCollapsed.emit(isCollapsed);
  }

  render() {
    return [
      <div class="backdrop" onClick={() => this.toggle()} ref={element => this.backdropRef = element} />,
      <aside class="container" ref={element => this.containerRef = element}>
        <header class="header">
          <h1 class="header__title">Innove</h1>
          <button id="header-button" onClick={() => this.toggle()}>
            <ion-icon class="header__menu-icon" name="menu" />
          </button>
        </header>
        <rh-side-bar-items menuItems={this.menuItems} />
      </aside>,
      <main ref={element => this.mainContentRef = element} class="main-content">
        <slot></slot>
      </main>
    ];
  }
}
