//import './SideBar.css'
function SideBar() {

return (
<div id="sidebar">
            <div id="sidebar-header">
                <h3>Filtro</h3>
                <button id="openBtn" onclick="toggleSidebar()"><i class="fas fa-bars fa-xl"></i></button> 
            </div>
            <div class="sidebar-body">
                <div class="form-group">
                    <label class="label" for="provId">Provincia:</label>
                    <select id="provId" name="provId" required>
                        <option value="-1" disabled selected>Selecciona tu Provincia</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="label" for="localidadId">Localidad:</label>
                    <select id="localidadId" name="localidadId" required>
                        <option value="-1" disabled selected>Selecciona tu localidad</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="label" for="rubroId">Rubro:</label>
                    <select id="rubroId" name="rubroId" required>
                        <option selected>TODOS</option>
                    </select>
                </div>
                <div class="form-dto">
                    <label class="label">Porcetaje de descuento:</label>
                    <div id="checkContainer">
                        <div class="check">
                            <input type="checkbox" value="10" id="10%" checked=""/>
                            <label for="10%">10%</label>
                        </div>
                        <div class="check">
                            <input type="checkbox" value="15" id="15%" checked=""/>
                            <label for="15%">15%</label>
                        </div>
                    </div>
                </div>
                <div id="toggleContainer" >
                    <span id="toggleLabel">Mostrar mapa:</span>
                    <label id="toggleSwitch" class="switch">
                        <input type="checkbox" id="toggleCheckbox" checked/>
                        <span id="toggleSlider" class="slider"></span>
                    </label>
                </div>

                <div class="div-btn">
                    <button class="btn-outline" onclick="LimpiarFiltro()">Limpiar</button>
                    <button class="btn-fill" onclick="CargarComercios()">Aplicar</button>
                </div>
            </div>
        </div>
        ); 
        
        }
        export default SideBar;