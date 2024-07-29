import React from 'react';

const CityPick = () => {
    return (
        <div className="fixed w-full h-full z-1000 bg-white">
            <div className="absolute left-1/2 top-1/2">
                <div className="absolute w-100 h-50 left-[-200px] top-[-100px] bg-white rounded-lg shadow-lg">
                    <form action="actions.php">
                        <input type="hidden" name="action" value="" />
                        <div className="block citypicker">
                            <div className="block-title flex items-center rounded-t-lg pl-24">
                                <img className="block-icon" src="https://www.cinemacenter.com.ar/images/icon-cca.png" alt="" />
                                <em>UBICACION</em> <b>ACTUAL</b>
                            </div>
                            <div className="block-content text-center font-tahoma leading-7 text-sm bg-transparent">
                                <div className="title">No hemos podido detectar su ubicación.</div>
                                <div className="subtitle">Por favor, ingrese su ciudad manualmente.</div>
                                <div className="options mt-2 pb-2">
                                    <div className="sb selectbox cities w-43 inline-block relative" role="listbox" >
                                        <div className="display cities" id="sbd592662113">
                                            <div className="text">SELECCIONA TU CIUDAD</div>
                                            <div className="arrow_btn">
                                                <span className="arrow"></span>
                                            </div>
                                        </div>
                                        <ul className="selectbox items cities max-h-72 absolute invisible w-62" role="menu" id="sbdd873926525" aria-hidden="true">
                                            <li id="sbo759874765"   className="selected first"  >
                                                <div className="item">
                                                    <div className="text">SELECCIONA TU CIUDAD</div>
                                                </div>
                                            </li>
                                            <li id="sbo182549738"    >
                                                <div className="item">
                                                    <div className="text">Alta Gracia</div>
                                                </div>
                                            </li>
                                            <li id="sbo725275317"    >
                                                <div className="item">
                                                    <div className="text">Bahía Blanca</div>
                                                </div>
                                            </li>
                                            <li id="sbo137663805"    >
                                                <div className="item">
                                                    <div className="text">Catamarca</div>
                                                </div>
                                            </li>
                                            <li id="sbo859671505"    >
                                                <div className="item">
                                                    <div className="text">Corrientes</div>
                                                </div>
                                            </li>
                                            <li id="sbo593364644"    >
                                                <div className="item">
                                                    <div className="text">Florencio Varela</div>
                                                </div>
                                            </li>
                                            <li id="sbo345755228"    >
                                                <div className="item">
                                                    <div className="text">La Rioja</div>
                                                </div>
                                            </li>
                                            <li id="sbo174680100"    >
                                                <div className="item">
                                                    <div className="text">Mar del Plata</div>
                                                </div>
                                            </li>
                                            <li id="sbo297492649"    >
                                                <div className="item">
                                                    <div className="text">Mendoza</div>
                                                </div>
                                            </li>
                                            <li id="sbo825026714"    >
                                                <div className="item">
                                                    <div className="text">Miramar</div>
                                                </div>
                                            </li>
                                            <li id="sbo756471677"    >
                                                <div className="item">
                                                    <div className="text">Resistencia</div>
                                                </div>
                                            </li>
                                            <li id="sbo508010692"    >
                                                <div className="item">
                                                    <div className="text">Río Cuarto</div>
                                                </div>
                                            </li>
                                            <li id="sbo729091282"    >
                                                <div className="item">
                                                    <div className="text">San Juan</div>
                                                </div>
                                            </li>
                                            <li id="sbo856237874"    >
                                                <div className="item">
                                                    <div className="text">San Luis</div>
                                                </div>
                                            </li>
                                            <li id="sbo5156204"    >
                                                <div className="item">
                                                    <div className="text">Tandil</div>
                                                </div>
                                            </li>
                                            <li id="sbo242182481"     className="last">
                                                <div className="item">
                                                    <div className="text">Tucuman</div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <select className="cities has_sb block" id="city-picker">
                                        <option value="">SELECCIONA TU CIUDAD</option>
                                        <option value="1">Alta Gracia</option>
                                        <option value="2">Bahía Blanca</option>
                                        <option value="3">Catamarca</option>
                                        <option value="4">Corrientes</option>
                                        <option value="5">Florencio Varela</option>
                                        <option value="15">La Rioja</option>
                                        <option value="6">Mar del Plata</option>
                                        <option value="17">Mendoza</option>
                                        <option value="18">Miramar</option>
                                        <option value="7">Resistencia</option>
                                        <option value="16">Río Cuarto</option>
                                        <option value="9">San Juan</option>
                                        <option value="10">San Luis</option>
                                        <option value="12">Tandil</option>
                                        <option value="13">Tucuman</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CityPick
