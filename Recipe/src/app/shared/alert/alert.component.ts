import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
@Component({
    selector:'app-alert',
    templateUrl:'./alert.component.html',
    styleUrls:['./alert.component.scss',],
})

export class SharedAlertComponent implements OnInit{
    @Input() mensagem:string;
    @Output() fechar = new EventEmitter<void>()
    constructor(){}
    ngOnInit(): void {}

    clickFechar(){
        this.fechar.emit();
    }
}