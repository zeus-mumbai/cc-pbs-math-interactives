!function(){"use strict"
ShapesComponent.Shapes.Point=function(e){this.fillColor=e.fillColor||ShapesComponent.Shapes.Point.DEFAULT_COLOR,this.lineColor=e.lineColor||ShapesComponent.Shapes.Point.DEFAULT_LINE_COLOR,this.graphicsRenderer=new PIXI.Graphics,this.shapeType=e.shapeType,this.graphCoord=e.graphCoord,this.canvasCoord=e.canvasCoord,this.radius="undefined"!=typeof e.radius?e.radius:ShapesComponent.Shapes.Point.DEFAULT_RADIUS,this.shapeObject=null,this.offspring=null,this.gridGraphView=null,this.pointType=e.pointType}
var e=ShapesComponent.Shapes.Point.prototype
e.createShape=function(){this.drawShape(),1===this.pointType&&this.bindEvents()},e.drawShape=function(){var e=new PIXI.Circle(this.canvasCoord.x,this.canvasCoord.y,this.radius)
this.shapeObject=this.graphicsRenderer.beginFill(this.fillColor,0).lineStyle(2,this.lineColor,1).drawShape(e),this.graphicsRenderer.endFill(),"ontouchstart"in window?this._setHitArea():this._setHitArea(),this.graphicsRenderer.visible=!1},e._setHitArea=function(){2!==this.pointType&&(this.graphicsRenderer.hitArea?(this.graphicsRenderer.hitArea.x=this.canvasCoord.x,this.graphicsRenderer.hitArea.y=this.canvasCoord.y):"ontouchstart"in window?this.graphicsRenderer.hitArea=new PIXI.Circle(this.canvasCoord.x,this.canvasCoord.y,this.radius+10):this.graphicsRenderer.hitArea=new PIXI.Circle(this.canvasCoord.x,this.canvasCoord.y,this.radius+5))},e.changeObjectVisibility=function(e){this.graphicsRenderer.visible=e,this.gridGraphView._refreshGridGraph()},e.changePointStyle=function(e){e?this.shapeObject.fillAlpha=1:this.shapeObject.fillAlpha=0,this.gridGraphView._refreshGridGraph()},e["delete"]=function(){this.graphicsRenderer.clear(),this.graphicsRenderer.mousedown=null,this.graphicsRenderer.mousemove=null,this.graphicsRenderer.mouseup=null,this.graphicsRenderer.touchstart=null,this.graphicsRenderer.touchmove=null,this.graphicsRenderer.touchend=null,this.changeObjectVisibility(!1)},e.update=function(e,i){var t={}
this.shapeObject.shape.x+=e,this.shapeObject.shape.y+=i,this.canvasCoord.x=this.shapeObject.shape.x,this.canvasCoord.y=this.shapeObject.shape.y,t=this.gridGraphView.model.convertToGraphCoordinates(this.canvasCoord),this.graphCoord.x=Number(t.x.toFixed(1)),this.graphCoord.y=Number(t.y.toFixed(1)),this._setHitArea(),this.gridGraphView._refreshGridGraph()},e.bindEvents=function(){var e=ShapesComponent.DrawShapes.PRIMITIVE_SHAPE_EVENTS
this.graphicsRenderer.interactive=!0,this.graphicsRenderer.touchstart=this.graphicsRenderer.mousedown=$.proxy(function(i){var t=this.graphView.model
i.stopPropagation(),t.idSelectedEqPanel!==t.constants.INVALID_VALUE&&t.idSelectedEqPanel!==this.offspring.equationPanelData.idEquationPanel&&t.trigger("onDeselectingEquationPanel",{eqPanelId:t.idSelectedEqPanel}),t.idSelectedEqPanel=this.offspring.equationPanelData.idEquationPanel,t.trigger("onSelectingEquationPanel",{eqPanelId:t.idSelectedEqPanel}),this.offspring.selectLine(),t.trigger("changeEquationSelection",{affectedEqPanelId:t.idSelectedEqPanel,idSelectedLine:this.offspring.lineId}),this.downPosition=_.clone(i.data.global),$(this).trigger(e.SHAPE_MOUSEDOWN,i),this.graphicsRenderer.touchmove=this.graphicsRenderer.mousemove=null,this.graphicsRenderer.touchmove=this.graphicsRenderer.mousemove=$.proxy(function(e){var i,t,s,n,h,o,r=this.offspring.sources
s=this.offspring.sources.indexOf(this),o=0===s?1:0,n=r[s],h=r[o],e.stopPropagation(),i=e.data.global.x-this.downPosition.x,t=e.data.global.y-this.downPosition.y,(0===s&&n.shapeObject.shape.x+i<h.shapeObject.shape.x||1===s&&n.shapeObject.shape.x+i>h.shapeObject.shape.x)&&(this.downPosition=_.clone(e.data.global),this.update(i,t),this.offspring.update())},this),window.ontouchend=window.onmouseup=$.proxy(function(e){this.graphicsRenderer.touchmove=this.graphicsRenderer.mousemove=null,window.touchend=window.onmouseup=null,this.downPosition=null},this)},this),this.graphicsRenderer.mouseover=$.proxy(function(i){i.stopPropagation(),$(this).trigger(e.SHAPE_MOUSEOVER,i)},this),this.graphicsRenderer.mouseout=$.proxy(function(i){i.stopPropagation(),$(this).trigger(e.SHAPE_MOUSEOUT,i)},this),this.graphicsRenderer.touchend=this.graphicsRenderer.mouseup=$.proxy(function(i){i.stopPropagation(),$(this).trigger(e.SHAPE_MOUSEUP,i),this.graphicsRenderer.touchmove=this.graphicsRenderer.mousemove=null,this.downPosition=null},this)},ShapesComponent.Shapes.Point.POINT_TYPE={SLIDER_POINT:0,POINT:1,RAY_POINT:2},ShapesComponent.Shapes.Point.DEFAULT_COLOR=0,ShapesComponent.Shapes.Point.DEFAULT_LINE_COLOR=10197915,ShapesComponent.Shapes.Point.DEFAULT_RADIUS=5}(ShapesComponent)